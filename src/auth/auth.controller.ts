import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User successfully registered' })
    async reigster(@Body() registerDto: RegisterDto) {
        return await this.authService.createUser(registerDto);
    }

    @Post('/login')
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'JWT tokens returned' })
    async login(@Body() loginDto: LoginDto){
        return await this.authService.login(loginDto);
    }

    @Post('/refresh-token')
    async refreshToken(@Body() { refreshToken }: RefreshTokenDto) {
        return await this.authService.refreshToken(refreshToken);
    }
}
