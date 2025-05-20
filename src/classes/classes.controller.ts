import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Request, ParseUUIDPipe } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateSportClassDto, GetClassesQueryDto, UpdateDescriptionDto, UpdateDurationDto, UpdateSportDto, UpdateSportClassDto, UpdateWeeklyScheduleDto } from './dto/class.dto';
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
    @ApiOperation({ summary: 'Get all classes (optional filter by sport)' })
    @ApiResponse({ status: 200, description: 'OK. List of sport classes' })
    @ApiResponse({ status: 400, description: 'Bad request. Sport must be one of the following values: Football, Basketball, Baseball' })
    async getClasses(@Query() { sport }: GetClassesQueryDto){
        return await this.classService.getClasses(sport);
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get class by ID' })
    @ApiResponse({ status: 200, description: 'OK. Class detials' })
    @ApiResponse({ status: 400, description: 'Bad request. Validation failed (uuid is expected)' })
    async getClass(@Param('id', new ParseUUIDPipe()) id:string){
        return await this.classService.getClass(id);
    }

    @Role(UserRole.ADMIN)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Get ('/:id/users')
    @ApiBearerAuth() 
    @ApiOperation({ summary: 'Get applied users for class with ID' })
    @ApiResponse({ status: 200, description: 'OK. List of users who applied to the class', type: [AppliedUserDto] })
    @ApiResponse({ status: 400, description: 'Bad request. Validation failed (uuid is expected)' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden. Admins only' })
    async getAppliedUsers(@Param('id',new ParseUUIDPipe()) id:string){
        return await this.classService.getAppliedUsers(id);
    }

    @Role(UserRole.ADMIN)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new sport class' })
    @ApiResponse({ status: 201, description: 'Created. Class successfully created' })
    @ApiResponse({ status: 400, description: 'Bad request. Validation failed or invalid UUID' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden. Admins only' })
    async createClass(@Body() createSportClassDto:CreateSportClassDto){
        return await this.classService.createClass(createSportClassDto);
    }

    @Role(UserRole.ADMIN)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Patch(':id/description')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update class description' })
    @ApiResponse({ status: 200, description: 'OK. Description updated successfully' })
    @ApiResponse({ status: 400, description: 'Bad request. Validation failed or invalid UUID' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden. Admins only' })
    @ApiResponse({ status: 404, description: 'Class not found' })
    async updateDescription(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() { description }: UpdateDescriptionDto,
    ): Promise<void> {
        return this.classService.updateDescription(id, description);
    }

    @Role(UserRole.ADMIN)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Patch(':id/duration')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update class duration' })
    @ApiResponse({ status: 200, description: 'OK. Duration updated successfully' })
    @ApiResponse({ status: 400, description: 'Bad request. Validation failed or invalid UUID' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden. Admins only' })
    @ApiResponse({ status: 404, description: 'Class not found' })
    async updateDuration(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() { duration }: UpdateDurationDto
    ): Promise<void> {
        return this.classService.updateDuration(id, duration);
    }

    @Role(UserRole.ADMIN)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Patch(':id/schedule')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update class schedule' })
    @ApiResponse({ status: 200, description: 'OK. Schedule updated successfully' })
    @ApiResponse({ status: 400, description: 'Bad request. Validation failed or invalid UUID' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden. Admins only' })
    @ApiResponse({ status: 404, description: 'Class not found' })
    async updateSchedule(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() { weeklySchedule }: UpdateWeeklyScheduleDto
    ): Promise<void> {
        return this.classService.updateSchedule(id, weeklySchedule);
    }

    @Role(UserRole.ADMIN)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Patch(':id/sport')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update class sport' })
    @ApiResponse({ status: 200, description: 'OK. Sport updated successfully' })
    @ApiResponse({ status: 400, description: 'Bad request. Validation failed or invalid UUID' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden. Admins only' })
    @ApiResponse({ status: 404, description: 'Class not found' })
    async updateSport(
        @Param('id', new ParseUUIDPipe()) classId: string,
        @Body() { sportId }: UpdateSportDto
    ): Promise<void> {
        return this.classService.updateSport(classId, sportId);
    }

    @Role(UserRole.ADMIN)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Patch('/:id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update class' })
    @ApiResponse({ status: 200, description: 'OK. Class updated successfully' })
    @ApiResponse({ status: 400, description: 'Bad request. Validation failed or invalid UUID' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden. Admins only' })
    @ApiResponse({ status: 404, description: 'Class not found' })
        async updateClass(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updateSportClassDto: UpdateSportClassDto,
    ) {
        return await this.classService.updateClass(id, updateSportClassDto);
    }

    @Role(UserRole.ADMIN)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Delete('/:id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete class' })
    @ApiResponse({ status: 200, description: 'OK. Class deleted successfully' })
    @ApiResponse({ status: 400, description: 'Bad request. Validation failed (uuid is expected)' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden. Admins only' })
    @ApiResponse({ status: 404, description: 'Class not found' })
    async deleteRecipe(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.classService.deleteClass(id);
    }

    @Role(UserRole.USER)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Post('/:id/apply')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Apply user to a class' })
    @ApiResponse({ status: 201, description: 'Created. User successfully applied' })
    @ApiResponse({ status: 400, description: 'Bad request. Validation failed (uuid is expected)' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden. Users only' })
    @ApiResponse({ status: 404, description: 'Class not found' })
    @ApiResponse({ status: 409, description: 'Conflict. User is already enrolled in this class' })
    async applyToClass(@Param('id', new ParseUUIDPipe()) classId: string, @Request() req) {
        const userId = req.user.userId;
        return await this.classService.applyToClass(userId, classId);
    }
}
