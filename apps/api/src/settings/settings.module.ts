import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { TmItem } from './tm-item.entity';
import { ProcessItem } from './process-item.entity';
import { Control } from './control.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TmItem, ProcessItem, Control])],
    controllers: [SettingsController],
    providers: [SettingsService],
    exports: [SettingsService],
})
export class SettingsModule { }
