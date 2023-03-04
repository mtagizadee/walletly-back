import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  return await NestFactory.create(AppModule);
}
async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await bootstrap();
  await app.listen(PORT, () => console.log(`SERVER STARTED ON PORT: ${PORT}`));
}

start();
