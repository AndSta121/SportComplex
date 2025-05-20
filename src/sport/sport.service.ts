import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Sport } from './entity/sport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ViewSportDto } from './dto/sport.dto';

@Injectable()
export class SportService {
    constructor(@InjectRepository(Sport) private sportRepository: Repository<Sport>){}

    async getSports(): Promise<ViewSportDto[]>{
        const sports = await this.sportRepository.find();
        return sports.map(({ id, name }) => ({ id, name }));
    }

    async getSport(id:string): Promise<ViewSportDto>{
        const sport = await this.sportRepository.findOne({ where: {id}});
        if(!sport){
            throw new HttpException('No sport entity found', HttpStatus.NOT_FOUND);
        }
        const { name, id: sportId } = sport;
        return { id: sportId, name };
    }
}
