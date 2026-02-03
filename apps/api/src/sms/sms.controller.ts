import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SmsService } from './sms.service';

@ApiTags('sms')
@Controller('sms')
export class SmsController {
    constructor(private readonly smsService: SmsService) { }

    @Get('records')
    @ApiOperation({ summary: 'Get all SMS records' })
    findAll() {
        return this.smsService.findAll();
    }

    @Post('records')
    @ApiOperation({ summary: 'Create SMS record' })
    create(@Body() record: any) {
        return this.smsService.create(record);
    }
}
