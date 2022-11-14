import {Injectable, Logger} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import * as fs from "fs-extra";
import * as FormData from "form-data";
import {firstValueFrom} from "rxjs";
import * as Process from "process";
import {execute} from "./util";
import {join} from "path";

@Injectable()
export class PackService {
  private readonly logger = new Logger('PackService');

  constructor(private readonly httpService: HttpService) {
  }



  async pack() {
    this.logger.log('🚀 Pack');
    const project = fs.readJsonSync('project.json');

    this.logger.log(`🚀 Pack ${project.name}...`);
    const pluginDir = join(project.targets.build.options.outputPath,'..');
    const outputPath = join(pluginDir, 'dist');
    const archive = join(pluginDir, `${project.name}.zip`);
    await execute(`rm -rf ${archive} && cd ${pluginDir}  && zip -r -j ${archive}.zip ${project.name}/* && cd -`);
  }
}
