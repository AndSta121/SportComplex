import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateSportClassDto{
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    duration: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    weeklySchedule: string[]; 

    @IsUUID()
    @IsNotEmpty()
    sportId: string; 
}

export class UpdateSportClassDto {
    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    duration?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    weeklySchedule?: string[];

    @IsOptional()
    @IsUUID()
    sportId?: string; 
}