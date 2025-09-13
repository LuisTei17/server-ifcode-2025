import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email_usuario: string;

  @IsString()
  password: string;
}