import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'user@example.com', description: 'Email of the user' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8)
  @ApiProperty({ example: 'Password123', description: 'Password for user registration' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(8)
  @ApiProperty({ example: 'Password123', description: 'Password confirmation for registration' })
  passwordConfirm: string;

  @IsString()
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  firstName: string;

  @IsString()
  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  lastName: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'user@example.com', description: 'Email of the user' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'user@example.com', description: 'Email of the user' })
  password: string;
}

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'sample-refresh-token', description: 'The refresh token used to get a new access token' })
  refreshToken: string;
}

export class AppliedUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email of the user' })
  email: string;

  @ApiProperty({ example: 'John', description: 'First name of the user' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  lastName: string;
}

