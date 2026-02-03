import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('voice_call_records')
export class VoiceCallRecord {
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
    callTime: string;

    @Column()
    callStatus: string;

    @CreateDateColumn()
    createdAt: Date;
}
