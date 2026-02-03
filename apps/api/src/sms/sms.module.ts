import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';
import { SmsRecord } from './sms-record.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SmsRecord])],
    controllers: [SmsController],
    providers: [SmsService],
    exports: [SmsService],
})
export class SmsModule { }
