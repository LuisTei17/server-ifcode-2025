import { IsEmail, IsString, MinLength, IsOptional, IsDateString, IsNumberString } from 'class-validator';

export class RegisterDto {
  @IsString()
  nome_usuario: string;

  @IsEmail()
  email_usuario: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsNumberString()
  cod_tip_usuario?: number;

  @IsOptional()
  @IsString()
  telefone_usuario?: string;

  @IsOptional()
  @IsDateString()
  dt_nasc?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsNumberString()
  cod_interesse?: number;

  @IsOptional()
  @IsString()
  contato_emerg?: string;

  @IsOptional()
  @IsString()
  cep?: string;

  @IsOptional()
  @IsString()
  num_endereco?: string;

  @IsOptional()
  @IsString()
  complemento_endereco?: string;
}