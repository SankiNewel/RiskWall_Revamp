import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { Alert } from './alert.entity';
import { AlertsGateway } from './alerts.gateway';
import { AlertsConsumer } from './alerts.consumer';
import { AlertsBridgeService } from './alerts.bridge.service';

@Module({
    imports: [TypeOrmModule.forFeature([Alert])],
    controllers: [AlertsController, AlertsConsumer],
    providers: [AlertsService, AlertsGateway, AlertsBridgeService],
    exports: [AlertsService],
})
export class AlertsModule { }
