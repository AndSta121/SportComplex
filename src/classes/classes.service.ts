import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SportClass } from './entity/class';
import { Repository } from 'typeorm';
import { SportClassDto } from './dto/class.dto';

@Injectable()
export class ClassesService {
    constructor(@InjectRepository(SportClass) private classRepository:Repository<SportClass>){}

    async getClasses(sportName?:string): Promise<SportClass[]>{
        if(sportName){
            return this.classRepository.find({where: {sport: {name: sportName}}});
        }

        return this.classRepository.find();
    }

    async getClass(id:string): Promise<SportClass>{
        const sportClass = await this.classRepository.findOne({where: {id}});
        if(!sportClass){
            throw new HttpException('No entity found', HttpStatus.NOT_FOUND);
        }

        return sportClass;
    }
    
    async createClass(sportClassDto: SportClassDto): Promise<void>{
        await this.classRepository.save({...sportClassDto});
    }

}
