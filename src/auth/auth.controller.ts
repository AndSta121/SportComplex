import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto/user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'Created. User successfully registered' })
    @ApiResponse({ status: 400, description: 'Bad request. Validation failed' })
    @ApiResponse({ status: 409, description: 'Conflict. Email already registered' })
    @ApiBody({ type: RegisterDto })
    async reigster(@Body() registerDto: RegisterDto) {
        return await this.authService.createUser(registerDto);
    }

    @Post('/login')
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 201, description: 'Created. JWT tokens returned' })
    @ApiResponse({ status: 400, description: 'Bad request. Validation failed' })
    @ApiResponse({ status: 401, description: 'Unauthorized. Invalid credentials' })
    @ApiBody({ type: LoginDto })
    async login(@Body() loginDto: LoginDto){
        return await this.authService.login(loginDto);
    }

    @Post('/refresh-token')
    @ApiOperation({ summary: 'Refresh JWT tokens using a valid refresh token' })
    @ApiResponse({ status: 202, description: 'Created. New token and refresh tokens returned' })
    @ApiResponse({ status: 400, description: 'Bad request. Validation failed' })
    @ApiResponse({ status: 401, description: 'Unauthorized. Refresh token expired or invalid' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiBody({ type: RefreshTokenDto })
    async refreshToken(@Body() { refreshToken }: RefreshTokenDto) {
        return await this.authService.refreshToken(refreshToken);
    }
}
