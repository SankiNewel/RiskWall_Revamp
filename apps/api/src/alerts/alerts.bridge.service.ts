import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import { AlertsService } from './alerts.service';
import { AlertsGateway } from './alerts.gateway';

@Injectable()
export class AlertsBridgeService implements OnModuleInit {
    private readonly logger = new Logger(AlertsBridgeService.name);

    constructor(
        private configService: ConfigService,
        private alertsService: AlertsService,
        private alertsGateway: AlertsGateway,
    ) { }

    async onModuleInit() {
        this.setupBridge();
    }

    async setupBridge() {
        const rmqUrl = this.configService.get<string>('RABBITMQ_URL');
        if (!rmqUrl) {
            this.logger.error('RABBITMQ_URL not found in config');
            return;
        }

        try {
            const connection = await amqp.connect(rmqUrl);
            const channel = await connection.createChannel();

            const exchangeName = 'RiskWall.Core.Messages:AlertCreated';
            const queueName = 'riskwall_nest_bridge_queue';

            // 1. Ensure exchange exists (MassTransit usually creates it as 'fanout')
            await channel.assertExchange(exchangeName, 'fanout', { durable: true });

            // 2. Ensure our queue exists
            await channel.assertQueue(queueName, { durable: true });

            // 3. Bind our queue to the MassTransit exchange
            await channel.bindQueue(queueName, exchangeName, '');

            this.logger.log(`Successfully bound to exchange: ${exchangeName}`);

            // 4. Consume messages
            channel.consume(queueName, async (msg) => {
                if (msg) {
                    try {
                        const content = JSON.parse(msg.content.toString());
                        this.logger.log('Received raw alert from bridge:', JSON.stringify(content).substring(0, 100));

                        const alertData = content.message || content;

                        const savedAlert = await this.alertsService.create({
                            severity: alertData.Severity || alertData.severity || 'INFO',
                            message: alertData.Message || alertData.message || 'No message',
                        });

                        this.alertsGateway.sendAlert(savedAlert);
                        channel.ack(msg);
                    } catch (err) {
                        this.logger.error('Error processing bridge message:', err.message);
                        // Don't ack so it can be retried or inspected
                    }
                }
            });
        } catch (error) {
            this.logger.error(`Failed to setup RabbitMQ bridge: ${error.message}`);
            // Retry after some time
            setTimeout(() => this.setupBridge(), 5000);
        }
    }
}
