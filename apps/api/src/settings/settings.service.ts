import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TmItem } from './tm-item.entity';
import { ProcessItem } from './process-item.entity';
import { Control } from './control.entity';

@Injectable()
export class SettingsService {
    constructor(
        @InjectRepository(TmItem)
        private tmRepository: Repository<TmItem>,
        @InjectRepository(ProcessItem)
        private processRepository: Repository<ProcessItem>,
        @InjectRepository(Control)
        private controlRepository: Repository<Control>,
    ) { }

    // TM Items
    findAllTm(): Promise<TmItem[]> {
        return this.tmRepository.find();
    }

    createTm(item: Partial<TmItem>): Promise<TmItem> {
        return this.tmRepository.save(this.tmRepository.create(item));
    }

    // Process Items
    findAllProcesses(): Promise<ProcessItem[]> {
        return this.processRepository.find();
    }

    async updateProcess(id: number, update: Partial<ProcessItem>): Promise<ProcessItem | null> {
        await this.processRepository.update(id, update);
        return this.processRepository.findOneBy({ id });
    }

    // Controls
    findAllControls(type?: string): Promise<Control[]> {
        return type ? this.controlRepository.find({ where: { type } }) : this.controlRepository.find();
    }

    async updateControl(key: string, enabled: boolean): Promise<Control | null> {
        await this.controlRepository.update({ key }, { enabled });
        return this.controlRepository.findOneBy({ key });
    }
}
