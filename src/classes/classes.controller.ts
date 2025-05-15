import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateSportClassDto, UpdateSportClassDto } from './dto/class.dto';

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
    async createClass(@Body() createSportClassDto:CreateSportClassDto){
        return await this.classService.createClass(createSportClassDto);
    }

    @Patch(':id/description')
    async updateDescription(
        @Param('id') id: string,
        @Body('description') description: string,
    ): Promise<void> {
        return this.classService.updateDescription(id, description);
    }

    @Patch(':id/duration')
    async updateDuration(
        @Param('id') id: string,
        @Body('duration') duration: string
    ): Promise<void> {
        return this.classService.updateDuration(id, duration);
    }

    @Patch(':id/schedule')
    async updateSchedule(
        @Param('id') id: string,
        @Body('schedule') schedule: string[]
    ): Promise<void> {
        return this.classService.updateSchedule(id, schedule);
    }

    @Patch(':id/sport')
    async updateSport(
        @Param('id') classId: string,
        @Body('sportId') sportId: string
    ): Promise<void> {
        return this.classService.updateSport(classId, sportId);
    }

    @Patch('/:id')
        async updateClass(
        @Param('id') id: string,
        @Body() updateSportClassDto: UpdateSportClassDto,
    ) {
        return await this.classService.updateClass(id, updateSportClassDto);
    }

    @Delete('/:id')
    async deleteRecipe(@Param('id') id: string) {
        return await this.classService.deleteClass(id);
    }
}
