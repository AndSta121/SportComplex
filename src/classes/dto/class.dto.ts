import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateSportClassDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    duration: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    @ApiProperty()
    weeklySchedule: string[]; 

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    sportId: string; 
}

export class UpdateSportClassDto {
    @IsOptional()
    @IsString()
    @ApiProperty()
    description?: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    duration?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @ApiProperty()
    weeklySchedule?: string[];

    @IsOptional()
    @IsUUID()
    @ApiProperty()
    sportId?: string; 
}