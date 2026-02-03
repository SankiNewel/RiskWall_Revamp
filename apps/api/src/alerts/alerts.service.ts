import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './alert.entity';

@Injectable()
export class AlertsService {
    constructor(
        @InjectRepository(Alert)
        private alertsRepository: Repository<Alert>,
    ) { }

    findAll(): Promise<Alert[]> {
        return this.alertsRepository.find({
            order: {
                created_at: 'DESC'
            }
        });
    }

    create(alert: Partial<Alert>): Promise<Alert> {
        const newAlert = this.alertsRepository.create(alert);
        return this.alertsRepository.save(newAlert);
    }
}
