import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoiceCallController } from './voice-call.controller';
import { VoiceCallService } from './voice-call.service';
import { VoiceCallRecord } from './voice-call-record.entity';

@Module({
    imports: [TypeOrmModule.forFeature([VoiceCallRecord])],
    controllers: [VoiceCallController],
    providers: [VoiceCallService],
    exports: [VoiceCallService],
})
export class VoiceCallModule { }
