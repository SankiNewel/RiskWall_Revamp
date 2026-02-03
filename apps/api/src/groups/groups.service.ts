import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';

@Injectable()
export class GroupsService {
    constructor(
        @InjectRepository(Group)
        private groupsRepository: Repository<Group>,
    ) { }

    findAll(): Promise<Group[]> {
        return this.groupsRepository.find();
    }

    findOne(id: number): Promise<Group | null> {
        return this.groupsRepository.findOneBy({ id });
    }

    create(group: Partial<Group>): Promise<Group> {
        const newGroup = this.groupsRepository.create(group);
        return this.groupsRepository.save(newGroup);
    }

    async update(id: number, group: Partial<Group>): Promise<Group | null> {
        await this.groupsRepository.update(id, group);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.groupsRepository.delete(id);
    }
}
