import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && await this.userService.validatePassword(user, password)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { 
      email: user.email_usuario, 
      sub: user.id_usuario,
      name: user.nome_usuario 
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id_usuario: user.id_usuario,
        nome_usuario: user.nome_usuario,
        email_usuario: user.email_usuario,
      }
    };
  }

  async register(registerDto: RegisterDto): Promise<{ access_token: string; user: any }> {
    const { password, dt_nasc, ...userData } = registerDto;
    
    // Convert date string to Date object if provided
    const userDataWithDate = {
      ...userData,
      ...(dt_nasc && { dt_nasc: new Date(dt_nasc) }),
    };

    const user = await this.userService.createUser(userDataWithDate, password);
    
    return this.login(user);
  }

  async googleLogin(user: User) {
    return this.login(user);
  }
}
