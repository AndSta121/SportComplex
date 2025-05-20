import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsIn, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateSportClassDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Advanced Football Class', description: 'Description of the sport class' })
    description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '60 minutes', description: 'Duration of the sport class' })
    duration: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    @ApiProperty({ example: '60 minutes', description: 'Duration of the sport class' })
    weeklySchedule: string[]; 

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({ example: 'a7f3c63b-2c9b-4f1e-9f9f-48fd8a6e9307', description: 'Sport ID associated with this class' })
    sportId: string; 
}

export class UpdateSportClassDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Advanced Football Class', description: 'Description of the sport class (optional)', required: false })
    description?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: '90 minutes', description: 'Duration of the class (optional)', required: false })
    duration?: string;

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    @ApiProperty({ example: ['Tuesday', 'Thursday'], description: 'Updated weekly schedule for the class', required: false })
    weeklySchedule?: string[];

    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({ example: 'a7f3c63b-2c9b-4f1e-9f9f-48fd8a6e9307', description: 'Sport ID associated with this class (optional)', required: false })
    sportId?: string;
}

export class UpdateDescriptionDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Updated class description', description: 'New description for the sport class' })
    description: string;
}

export class UpdateDurationDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '75 minutes', description: 'Updated duration for the sport class' })
    duration: string;
}

export class UpdateWeeklyScheduleDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    @ApiProperty({ example: ['Monday', 'Wednesday'], description: 'Updated weekly schedule for the class' })
    weeklySchedule: string[];
}

export class UpdateSportDto {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({ example: 'a7f3c63b-2c9b-4f1e-9f9f-48fd8a6e9307', description: 'Sport ID to update the class sport' })
    sportId: string;
}

export class GetClassesQueryDto {
    @IsOptional()
    @IsString()
    @IsIn(['Football', 'Basketball', 'Baseball']) 
    @ApiProperty({ example: 'Football', description: 'Sport to filter classes by' })
    sport?: string;
}