import { SportDto } from "src/sport/dto/sport.dto";
import { User } from "src/users/entity/user";

export class SportClassDto{
    description: string;
    duration: string;
    weeklySchedule: string[]; 
    sport: SportDto;
    users: User[];  
}