import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Walletly example')
    .setDescription('The walletly API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  return app;
}
async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await bootstrap();
  await app.listen(PORT, () => console.log(`SERVER STARTED ON PORT: ${PORT}`));
}

start();
