import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8)
    password: string;

    @IsNotEmpty()
    @IsString()
    @Length(8)
    // @Match('password')
    passwordConfirm: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

