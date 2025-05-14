import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { SportClassDto } from './dto/class.dto';

@Controller('classes')
export class ClassesController {

    constructor(private classService: ClassesService){}

    @Get()
    async getClasses(@Query('sport') sport?: string){
        return await this.classService.getClasses(sport);
    }

    @Get('/:id')
    async getClass(@Param('id') id:string){
        return await this.classService.getClass(id);
    }

    @Post()
    async createClass(@Body() sportClassDto:SportClassDto){
        return await this.classService.createClass(sportClassDto);
    }


}
