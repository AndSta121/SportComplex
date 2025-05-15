import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SportClass } from './entity/class';
import { Repository } from 'typeorm';
import { CreateSportClassDto, UpdateSportClassDto } from './dto/class.dto';
import { Sport } from 'src/sport/entity/sport';

@Injectable()
export class ClassesService {
    constructor(
        @InjectRepository(SportClass) 
        private classRepository:Repository<SportClass>,
    
        @InjectRepository(Sport)
        private readonly sportRepository: Repository<Sport>){}

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
        await this.classRepository.delete({ id });
    }

}
