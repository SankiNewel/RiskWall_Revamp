import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('alerts')
export class Alert {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty({ example: 'CRITICAL' })
    severity: string;

    @Column()
    @ApiProperty({ example: 'High CPU usage detected' })
    message: string;

    @Column({ default: 'NEW' })
    @ApiProperty({ example: 'NEW' })
    status: string;

    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;
}
