import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module.js';
import { TransformInterceptor } from './common/interceptors/transform.interceptor.js';
import { AllExceptionsFilter } from './common/filters/http-exception.filter.js';

async function bootstrap() {
  const logger = new Logger('AstamamiBootstrap');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') || 3001;
  const frontendUrl = configService.get<string>('frontendUrl') || 'http://localhost:3000';

  // Global API Prefix
  app.setGlobalPrefix('api/v1');

  // CORS
  app.enableCors({
    origin: [frontendUrl, 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global Interceptors & Exception Filters
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(port);
  logger.log(`Astamami Backend running locally at http://localhost:${port}/api/v1`);
}

await bootstrap();
