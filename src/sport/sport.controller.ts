import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { SportService } from './sport.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ViewSportDto } from './dto/sport.dto';

@Controller('sport')
export class SportController {

    constructor(private sportService: SportService){}

    @Get()
    @ApiOperation({ summary: 'Get all sports' })
    @ApiResponse({ status: 200, description: 'OK. List of sports', type: [ViewSportDto] })
    async getSports(){
        return await this.sportService.getSports();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get sport by ID' })
    @ApiResponse({ status: 200, description: 'OK. Sport details', type: [ViewSportDto] })
    @ApiResponse({ status: 400, description: 'Bad request. Validation failed (uuid is expected)' })
    async getSport(@Param('id', new ParseUUIDPipe()) id:string){
        return await this.sportService.getSport(id);
    }
}
