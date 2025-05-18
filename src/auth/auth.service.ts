import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entity/user';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { hash, compare} from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export interface JWTTokens {
    token: string;
    refreshToken: string;
}

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async createUser(registerDto: RegisterDto){
        const existingUser = await this.userRepository.findOne({
            where: {email: registerDto.email},
        });

        if(existingUser) {
            throw new HttpException('Email already registered!', 400);
        }

        const hashedPassword = await this.hashPassword(registerDto.password);

        await this.userRepository.save({
            email: registerDto.email,
            firstName: registerDto.firstName,
            lastName: registerDto.lastName,
            password: hashedPassword,
            role: UserRole.USER
        })
    }

    async login(loginDto: LoginDto): Promise<JWTTokens>{
        const user = await this.userRepository.findOne({ where: { email : loginDto.email } });

        if (!user) {
            throw new HttpException('Invalid credentials!', 400);
        }

        const validPassword = await compare(loginDto.password, user.password);

        if (!validPassword) {
            throw new HttpException('Invalid credentials!', 400);
        }

        return this.getTokens(user);

    }

    private hashPassword(passwords: string): Promise<string> {
        return hash(passwords,10);
    }

    private async getTokens(user:User): Promise<JWTTokens> {
        const [token, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: user.id,
                    email: user.email,
                    role: user.role,
                },
                {
                    secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
                    expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION'),
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: user.id,
                    email: user.email,
                    role: user.role,
                },
                {
                    secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
                    expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION'),
                },
            ),
        ]);
        
        return {
            token,
            refreshToken
        };
    }

    async refreshToken(token: string): Promise<JWTTokens> {
        try {
            const { sub: id } = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
            });
            const user = await this.userRepository.findOneOrFail({
                where: { id },
            });
            return this.getTokens(user);
        } catch (err) {
            throw new HttpException('Invalid credentials!', 400);
        }
    }
}
