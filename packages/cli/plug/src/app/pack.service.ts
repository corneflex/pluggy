import {Injectable, Logger} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import * as fs from "fs-extra";
import * as FormData from "form-data";
import {firstValueFrom} from "rxjs";
import * as Process from "process";
import {execute} from "./util";
import {join} from "path";
import { workspaceRoot } from '@nrwl/devkit';

@Injectable()
export class PackService {
  private readonly logger = new Logger('PackService');

  async pack() {
    this.logger.log('🚀 Pack');
    const project = fs.readJsonSync('project.json');

    this.logger.log(`🚀 Pack ${project.name}...`);
    const pluginDir = join(workspaceRoot, project.targets.build.options.outputPath,'..');
   
    const archive = join(workspaceRoot,'dist', `${project.name}.zip`);
    this.logger.log(`🚀 Root ${archive} ${pluginDir}...`);
    await execute(`rm -rf ${archive} && cd ${pluginDir}  && zip -r -j ${archive} ${project.name}/* && cd -`);
  }
}
