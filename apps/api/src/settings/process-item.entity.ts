import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('process_items')
export class ProcessItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: 'OFF' })
    status: string;

    @Column({ default: false })
    isRunning: boolean;
}
