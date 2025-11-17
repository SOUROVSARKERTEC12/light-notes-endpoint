import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global validation pipe - STRICT configuration
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove properties not defined in DTO
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to DTO instances
      disableErrorMessages: false, // Set to true in production if you want to hide error details
    }),
  );
  app.use(morgan('combined'));
  const config = new DocumentBuilder()
    .setTitle('Notes & Auth API')
    .setDescription(
      'REST API for user authentication, note management, and refresh token-based authentication system',
    )
    .setVersion('1.0')
    .addTag('Notes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
