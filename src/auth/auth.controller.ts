import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {

    const { username, password } = loginDto;

    const result = await this.authService.login(username, password);

    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    return result;
  }
}