import { Controller, Get } from '@nestjs/common';
import { SportService } from './sport.service';

@Controller('sport')
export class SportController {

    constructor(private sportService: SportService){}

    @Get()
    async getSports(){
        return await this.sportService.getSports();
    }

    @Get()
    async getSport(id: string){
        return await this.sportService.getSport(id);
    }
}
