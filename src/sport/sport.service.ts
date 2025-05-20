import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Sport } from './entity/sport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SportService {
    constructor(@InjectRepository(Sport) private sportRepository: Repository<Sport>){}

    async getSports(): Promise<Sport[]>{
        return this.sportRepository.find();
    }

    async getSport(id:string): Promise<Sport>{
        const sport = await this.sportRepository.findOne({ where: {id}});
        if(!sport){
            throw new HttpException('No sport entity found', HttpStatus.NOT_FOUND);
        }
        return sport;
    }
}
