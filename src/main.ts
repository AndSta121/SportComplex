import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configSerive = app.get(ConfigService);
  const configPort = configSerive.get<number>('APP_PORT');
  const port = process.env.PORT ?? configPort ?? 3000;
  await app.listen(port);
}
bootstrap();
