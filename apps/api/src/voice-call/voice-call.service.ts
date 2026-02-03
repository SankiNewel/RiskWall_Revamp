import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VoiceCallRecord } from './voice-call-record.entity';

@Injectable()
export class VoiceCallService {
    constructor(
        @InjectRepository(VoiceCallRecord)
        private voiceCallRepository: Repository<VoiceCallRecord>,
    ) { }

    findAll(): Promise<VoiceCallRecord[]> {
        return this.voiceCallRepository.find({ order: { createdAt: 'DESC' } });
    }

    create(record: Partial<VoiceCallRecord>): Promise<VoiceCallRecord> {
        return this.voiceCallRepository.save(this.voiceCallRepository.create(record));
    }
}
