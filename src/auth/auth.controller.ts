import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async reigster(@Body() registerDto: RegisterDto) {
        return await this.authService.createUser(registerDto);
    }

    // @Post('login')
    // async login(@Body() logindDto: LoginDto){
    //     return await this.authService.login(loginDto);
    // }
}
