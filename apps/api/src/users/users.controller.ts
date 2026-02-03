import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by id' })
    findOne(@Param('id') id: string): Promise<User | null> {
        return this.usersService.findOne(+id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    create(@Body() user: Partial<User>): Promise<User> {
        return this.usersService.create(user);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a user' })
    update(@Param('id') id: string, @Body() user: Partial<User>): Promise<User | null> {
        return this.usersService.update(+id, user);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user' })
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(+id);
    }
}
