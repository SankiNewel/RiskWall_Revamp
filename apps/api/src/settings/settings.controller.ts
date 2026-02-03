import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SettingsService } from './settings.service';

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) { }

    @Get('tm')
    @ApiOperation({ summary: 'Get all TM items' })
    findAllTm() {
        return this.settingsService.findAllTm();
    }

    @Post('tm')
    @ApiOperation({ summary: 'Create TM item' })
    createTm(@Body() item: { name: string }) {
        return this.settingsService.createTm(item);
    }

    @Get('processes')
    @ApiOperation({ summary: 'Get all processes' })
    findAllProcesses() {
        return this.settingsService.findAllProcesses();
    }

    @Put('processes/:id')
    @ApiOperation({ summary: 'Update process status' })
    updateProcess(@Param('id') id: string, @Body() update: any) {
        return this.settingsService.updateProcess(+id, update);
    }

    @Get('controls')
    @ApiOperation({ summary: 'Get all controls' })
    findAllControls(@Query('type') type?: string) {
        return this.settingsService.findAllControls(type);
    }

    @Put('controls/:key')
    @ApiOperation({ summary: 'Update control status' })
    updateControl(@Param('key') key: string, @Body() body: { enabled: boolean }) {
        return this.settingsService.updateControl(key, body.enabled);
    }
}
