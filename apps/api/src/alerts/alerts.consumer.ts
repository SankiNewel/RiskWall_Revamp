import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { AlertsService } from './alerts.service';
import { AlertsGateway } from './alerts.gateway';

@Controller()
export class AlertsConsumer {
    constructor(
        private readonly alertsService: AlertsService,
        private readonly alertsGateway: AlertsGateway,
    ) { }

    @MessagePattern('RiskWall.Core.Messages:AlertCreated')
    async handleAlertCreated(@Payload() data: any, @Ctx() context: RmqContext) {
        console.log('Received Alert from RabbitMQ:', data);

        // MassTransit messages are packed in a 'message' property
        const alertData = data.message || data;

        const savedAlert = await this.alertsService.create({
            severity: alertData.Severity || alertData.severity,
            message: alertData.Message || alertData.message,
            // Add other fields as necessary
        });

        this.alertsGateway.sendAlert(savedAlert);
    }
}
