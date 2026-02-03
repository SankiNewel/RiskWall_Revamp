import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { Group } from './group.entity';

@ApiTags('groups')
@Controller('groups')
export class GroupsController {
    constructor(private readonly groupsService: GroupsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all groups' })
    findAll(): Promise<Group[]> {
        return this.groupsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get group by id' })
    findOne(@Param('id') id: string): Promise<Group | null> {
        return this.groupsService.findOne(+id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new group' })
    create(@Body() group: Partial<Group>): Promise<Group> {
        return this.groupsService.create(group);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a group' })
    update(@Param('id') id: string, @Body() group: Partial<Group>): Promise<Group | null> {
        return this.groupsService.update(+id, group);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a group' })
    remove(@Param('id') id: string): Promise<void> {
        return this.groupsService.remove(+id);
    }
}
