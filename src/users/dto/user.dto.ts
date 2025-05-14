import { SportClassDto } from "src/classes/dto/class.dto";

export class User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    sportClasses: SportClassDto[];
}