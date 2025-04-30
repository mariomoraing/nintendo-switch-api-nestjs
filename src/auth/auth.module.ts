import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module'; // Lo crearemos después
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthController } from '../auth/auth.controller'

@Module({
    imports: [
      UsersModule,
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.registerAsync({
        useFactory: (configService: ConfigService) => ({
          secret: configService.get<string>('SECRET_KEY'),
          signOptions: {expiresIn: '60m'}
        }),
        inject: [ConfigService],
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})

export class AuthModule {}