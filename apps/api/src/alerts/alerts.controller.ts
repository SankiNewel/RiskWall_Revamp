import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AlertsService } from './alerts.service';
import { Alert } from './alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';

@ApiTags('alerts')
@Controller('alerts')
export class AlertsController {
    constructor(private readonly alertsService: AlertsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all alerts' })
    @ApiResponse({ status: 200, description: 'Return all alerts', type: [Alert] })
    findAll(): Promise<Alert[]> {
        return this.alertsService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new alert' })
    @ApiResponse({ status: 201, description: 'The alert has been successfully created.', type: Alert })
    create(@Body() createAlertDto: CreateAlertDto): Promise<Alert> {
        return this.alertsService.create(createAlertDto);
    }
}
