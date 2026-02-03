import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateAlertDto {
    @ApiProperty({ example: 'ACKNOWLEDGED', required: false })
    @IsString()
    @IsOptional()
    status?: string;
}
