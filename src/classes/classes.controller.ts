import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Request } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateSportClassDto, UpdateSportClassDto } from './dto/class.dto';
import { AccessTokenGuard } from 'src/auth/guard/access-token-guard';
import { Role } from 'src/auth/decorators/role';
import { UserRole } from 'src/auth/entity/user';
import { RoleGuard } from 'src/auth/guard/authorization.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppliedUserDto } from 'src/auth/dto/user.dto';

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

    @Role(UserRole.ADMIN)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Get ('/:id/users')
    @ApiResponse({ status: 200, type: [AppliedUserDto] })
    async getAppliedUsers(@Param('id') id:string){
        return await this.classService.getAppliedUsers(id);
    }

    @Role(UserRole.ADMIN)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Post()
    async createClass(@Body() createSportClassDto:CreateSportClassDto){
        return await this.classService.createClass(createSportClassDto);
    }

    @Role(UserRole.ADMIN)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Patch(':id/description')
    async updateDescription(
        @Param('id') id: string,
        @Body('description') description: string,
    ): Promise<void> {
        return this.classService.updateDescription(id, description);
    }

    @Role(UserRole.ADMIN)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Patch(':id/duration')
    async updateDuration(
        @Param('id') id: string,
        @Body('duration') duration: string
    ): Promise<void> {
        return this.classService.updateDuration(id, duration);
    }

    @Role(UserRole.ADMIN)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Patch(':id/schedule')
    async updateSchedule(
        @Param('id') id: string,
        @Body('schedule') schedule: string[]
    ): Promise<void> {
        return this.classService.updateSchedule(id, schedule);
    }

    @Role(UserRole.ADMIN)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Patch(':id/sport')
    async updateSport(
        @Param('id') classId: string,
        @Body('sportId') sportId: string
    ): Promise<void> {
        return this.classService.updateSport(classId, sportId);
    }

    @Role(UserRole.ADMIN)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Patch('/:id')
        async updateClass(
        @Param('id') id: string,
        @Body() updateSportClassDto: UpdateSportClassDto,
    ) {
        return await this.classService.updateClass(id, updateSportClassDto);
    }

    @Role(UserRole.ADMIN)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Delete('/:id')
    async deleteRecipe(@Param('id') id: string) {
        return await this.classService.deleteClass(id);
    }

    @ApiBearerAuth()
    @Role(UserRole.USER)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Post('/:id/apply')
    @ApiOperation({ summary: 'Apply user to a class' })
    @ApiResponse({ status: 201, description: 'User successfully applied' })
    async applyToClass(@Param('id') classId: string, @Request() req) {
        const userId = req.user.userId;
        return await this.classService.applyToClass(userId, classId);
    }
}
