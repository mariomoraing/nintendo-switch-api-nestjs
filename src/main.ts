import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);  
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());

  const corsOptions: CorsOptions = {
    origin: ['http://localhost:5173'], // Después usar el frontend,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  };

  app.enableCors(corsOptions);

  const rateLimiter = new RateLimiterMemory({
    points: 100,
    duration: 3600 // tiempo en segundos (1 hora).
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    rateLimiter
    .consume(req.ip) // IP del cliente para rastrear solicitudes
    .then(() => {
      next();
    })
    .catch(() =>{
      res.status(429).json({ error: 'Too Many Request' });
    });
  });



  await app.listen(process.env.PORT);
}
bootstrap();
