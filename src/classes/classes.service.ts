import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SportClass } from './entity/class';
import { Repository } from 'typeorm';
import { CreateSportClassDto, UpdateSportClassDto } from './dto/class.dto';
import { Sport } from 'src/sport/entity/sport';
import { User } from 'src/auth/entity/user';
import { AppliedUserDto } from 'src/auth/dto/user.dto';

@Injectable()
export class ClassesService {
    constructor(
        @InjectRepository(SportClass) 
        private classRepository:Repository<SportClass>,
    
        @InjectRepository(Sport)
        private readonly sportRepository: Repository<Sport>,
    
        @InjectRepository(User)
        private readonly userRepository: Repository<User>){}

    async getClasses(sportName?:string): Promise<SportClass[]>{
        if(sportName){
            return this.classRepository.find({where: {sport: {name: sportName}}});
        }

        return this.classRepository.find();
    }

    async getClass(id:string): Promise<SportClass>{
        const sportClass = await this.classRepository.findOne({where: {id}});
        if(!sportClass){
            throw new HttpException('No class entity found', HttpStatus.NOT_FOUND);
        }

        return sportClass;
    }

    async getAppliedUsers(id:string): Promise<AppliedUserDto[]> {
        const sportClass = await this.classRepository.findOne({
            where: { id },
            relations: ['users'],
        });

        if (!sportClass) {
            throw new HttpException('No class entity found', HttpStatus.NOT_FOUND);
        }

        return sportClass.users.map(user => ({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        }));
    }
    
    async createClass(createSportClassDto: CreateSportClassDto): Promise<void>{
        const sport = await this.sportRepository.findOne({ where: { id: createSportClassDto.sportId } });

        if (!sport) {
            throw new HttpException('No sport entity found', HttpStatus.NOT_FOUND);
        }

        const sportClass = this.classRepository.create({
            description: createSportClassDto.description,
            duration: createSportClassDto.duration,
            weeklySchedule: createSportClassDto.weeklySchedule,
            sport: sport,
            users: [], 
        });
        await this.classRepository.save({...sportClass});
    }

    async updateDescription(id: string, description: string): Promise<void> {
        await this.classRepository.update({ id },{ description });  
    }

    async updateDuration(id: string, duration:string): Promise<void>{
        await this.classRepository.update({ id }, { duration });
    }

    async updateSchedule(id:string, schedule: string[]): Promise<void>{
        await this.classRepository.update({ id }, {weeklySchedule: schedule})
    }

    async updateSport(id:string, sportId: string): Promise<void>{
        const sportClass = await this.classRepository.findOne({
            where: {id},
            relations: ['sport'],
        });

        if(!sportClass){
            throw new HttpException('No class entity found', HttpStatus.NOT_FOUND);
        }

        const sport = await this.sportRepository.findOne({where: {id: sportId}});

        if(!sport) {
            throw new HttpException('No sport entity found', HttpStatus.NOT_FOUND);
        }

        sportClass.sport = sport;

        await this.classRepository.save(sportClass);
    }

    async updateClass(id: string, updateSportClassDto: UpdateSportClassDto): Promise<void> {
        const sportClass = await this.classRepository.findOne({
            where: { id },
            relations: ['sport'], // optional
        });

        if (!sportClass) {
            throw new HttpException('No class entity found', HttpStatus.NOT_FOUND);
        }

        if (updateSportClassDto.description !== undefined) sportClass.description = updateSportClassDto.description;
        if (updateSportClassDto.duration !== undefined) sportClass.duration = updateSportClassDto.duration;
        if (updateSportClassDto.weeklySchedule !== undefined) sportClass.weeklySchedule = updateSportClassDto.weeklySchedule;

        if (updateSportClassDto.sportId) {
            const sport = await this.sportRepository.findOne({ where: { id: updateSportClassDto.sportId } });
            console.log(sport);
            if (!sport) {
                throw new HttpException('No sport entity found', HttpStatus.NOT_FOUND);
            }
            sportClass.sport = sport;
        }

        await this.classRepository.save(sportClass);
    }

    async deleteClass(id: string): Promise<void> {
        const result = await this.classRepository.delete({ id });

        if (result.affected === 0) {
            throw new HttpException('No class entity found', HttpStatus.NOT_FOUND);
        }
    }

    async applyToClass(userId:string, classId: string): Promise<void>{
        const sportClass = await this.classRepository.findOne({
            where: { id: classId },
            relations: ['users']
        });

        if (!sportClass) {
            throw new HttpException('No class entity found', HttpStatus.NOT_FOUND);
        }

        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new HttpException('No user entity found', HttpStatus.NOT_FOUND);
        }

        if (sportClass.users.some(existingUser => existingUser.id === userId)) {
            throw new HttpException(`User is already enrolled in this class`,
                HttpStatus.CONFLICT,
            );
        }

        sportClass.users.push(user);

        await this.classRepository.save(sportClass);
    }
        

}
