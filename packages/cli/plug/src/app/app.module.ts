import { PackService } from './pack.service';
import {Module} from "@nestjs/common";
import {LoggerModule} from 'nestjs-pino';
import {PublishService} from "./publish.service";
import {PublishCommand} from "./publish.command";
import {PackCommand} from "./pack.command";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [HttpModule, LoggerModule.forRoot(
    {
      pinoHttp: {
        level: 'debug',
        transport: {target: 'pino-pretty', options: {colorize: true, singleLine: true}},
      }
    }
  )],
  providers: [PublishService, PublishCommand, PackService, PackCommand],
})
export class AppModule {
}
