import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('controls')
export class Control {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    key: string;

    @Column({ default: false })
    enabled: boolean;

    @Column()
    type: string; // 'SMS' or 'Voice'
}
