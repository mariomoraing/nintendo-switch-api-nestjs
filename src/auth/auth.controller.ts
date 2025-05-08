import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {

    const { username, password } = loginDto;

    const result = await this.authService.login(username, password);

    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    return result;
  }


  @Post('register')
  async register(@Body() registerDto: { username: string; password: string }) {
    const user = await this.usersService.create(registerDto);
    const { password, ...result } = user;
    return result;
  }


}