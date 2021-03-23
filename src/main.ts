import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const port: number = config.get('server.port');
  const PORT = process.env.PORT ?? port;
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT);
}

bootstrap();
