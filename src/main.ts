import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Enable CORS for all origins
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

   // Serve static files from 'uploads' directory
   app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // This adds a prefix to the URL
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
