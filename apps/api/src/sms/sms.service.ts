import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SmsRecord } from './sms-record.entity';

@Injectable()
export class SmsService {
    constructor(
        @InjectRepository(SmsRecord)
        private smsRepository: Repository<SmsRecord>,
    ) { }

    findAll(): Promise<SmsRecord[]> {
        return this.smsRepository.find({ order: { createdAt: 'DESC' } });
    }

    create(record: Partial<SmsRecord>): Promise<SmsRecord> {
        return this.smsRepository.save(this.smsRepository.create(record));
    }
}
