/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {AppModule} from './app/app.module';
import {CommandFactory} from "nest-commander";
import {Logger} from "nestjs-pino";
import {NestFactory} from "@nestjs/core";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(Logger);
  await CommandFactory.run(AppModule, logger);
}

bootstrap();
