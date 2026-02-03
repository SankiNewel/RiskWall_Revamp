import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tm_items')
export class TmItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;
}
