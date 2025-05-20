import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Sport Complex API')
    .setDescription('API documentation for the Sport Complex backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  const configSerivce = app.get(ConfigService);
  const configPort = configSerivce.get<number>('APP_PORT');
  const port = process.env.PORT ?? configPort ?? 3000;
  await app.listen(port);
}
bootstrap();
