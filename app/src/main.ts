import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { checkNeededEnvironmentVariables } from './app.envvars';

async function bootstrap() {
  checkNeededEnvironmentVariables();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
