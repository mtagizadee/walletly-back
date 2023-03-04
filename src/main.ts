import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  return app;
}
async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await bootstrap();
  await app.listen(PORT, () => console.log(`SERVER STARTED ON PORT: ${PORT}`));
}

start();
