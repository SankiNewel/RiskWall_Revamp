import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { VoiceCallService } from './voice-call.service';

@ApiTags('voice-call')
@Controller('voice-call')
export class VoiceCallController {
    constructor(private readonly voiceCallService: VoiceCallService) { }

    @Get('records')
    @ApiOperation({ summary: 'Get all Voice Call records' })
    findAll() {
        return this.voiceCallService.findAll();
    }

    @Post('records')
    @ApiOperation({ summary: 'Create Voice Call record' })
    create(@Body() record: any) {
        return this.voiceCallService.create(record);
    }
}
