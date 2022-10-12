import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import {NestExpressApplication} from "@nestjs/platform-express";
import {UnauthorizedException} from "@nestjs/common";
import {UnauthorizedExceptionFilter} from "./auth/unauthorized-exception.filter";

const port = 1000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  await app.listen(port);
}
bootstrap().then(() => {
  console.log(`Server running on http port http://localhost:${port}`);
});
