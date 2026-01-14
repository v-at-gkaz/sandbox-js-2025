import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port: number = configService.get('SERVER_PORT') || 3000;

  await app.listen(port, '0.0.0.0');

  const url: string = await app.getUrl();

  console.log(`Server started at ${url}`);
}
bootstrap();
