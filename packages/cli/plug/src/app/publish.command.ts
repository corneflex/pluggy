import { Command, CommandRunner, Option } from 'nest-commander';
import {Logger} from "nestjs-pino";
import {PublishService} from "./publish.service";

interface BasicCommandOptions {
  name?: string;
}

@Command({ name: 'publish', description: 'A parameter parse' })
export class PublishCommand extends CommandRunner {
  constructor(private readonly publishService: PublishService) {
    super()
  }

  async run(
    passedParam: string[],
    options?: BasicCommandOptions,
  ): Promise<void> {
    this.publishService.publish();
  }

  @Option({
    flags: '-n, --number [number]',
    description: 'A basic number parser',
  })
  parseNumber(val: string): number {
    return Number(val);
  }

  @Option({
    flags: '-n, --name [string]',
    description: 'A string return',
  })
  parseString(val: string): string {
    return val;
  }


}
