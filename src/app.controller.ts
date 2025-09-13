import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      endpoints: {
        'POST /auth/register': 'User registration',
        'POST /auth/login': 'User login', 
        'GET /auth/google': 'Google OAuth initiation',
        'GET /auth/google/callback': 'Google OAuth callback',
        'GET /auth/profile': 'Get user profile (requires JWT token)',
      }
    };
  }
}
