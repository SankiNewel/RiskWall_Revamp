import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateAlertDto {
    @ApiProperty({ example: 'CRITICAL' })
    @IsString()
    @IsNotEmpty()
    severity: string;

    @ApiProperty({ example: 'Database connection failed' })
    @IsString()
    @IsNotEmpty()
    message: string;
}
