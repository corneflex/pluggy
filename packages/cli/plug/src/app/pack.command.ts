import { PackService } from './pack.service';
import { Command, CommandRunner, Option } from 'nest-commander';
import {Logger} from "nestjs-pino";

interface PackCommandOptions {
}

@Command({ name: 'pack', description: 'create plugin archive' })
export class PackCommand extends CommandRunner {
  constructor(private readonly packService: PackService) {
    super()
  }

  async run(
    passedParam: string[],
    options?: PackCommandOptions,
  ): Promise<void> {
    this.packService.pack();
  }


}
