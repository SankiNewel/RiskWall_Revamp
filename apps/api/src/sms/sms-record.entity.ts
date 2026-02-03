import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('sms_records')
export class SmsRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: string;

    @Column()
    exchange: string;

    @Column()
    group: string;

    @Column()
    segment: string;

    @Column()
    exchangeTime: string;

    @Column()
    clientId: string;

    @Column()
    utilization: string;

    @Column()
    contactNumber: string;

    @Column()
    smsTime: string;

    @Column()
    smsStatus: string;

    @CreateDateColumn()
    createdAt: Date;
}
