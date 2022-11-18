import {Injectable, Logger} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import * as fs from "fs-extra";
import * as FormData from "form-data";
import {firstValueFrom} from "rxjs";
import * as Process from "process";
import {execute} from "@pluggy/core";


@Injectable()
export class PublishService {
  private readonly logger = new Logger('PublishService');

  constructor(private readonly httpService: HttpService) {
  }



  async publish() {
    this.logger.log('🚀 Publish');
    const project = fs.readJsonSync('project.json');

    this.logger.log(`🚀 Build ${project.name}...`);
    await execute('nx build');
    this.logger.log(`🚀 Pack ${project.name}...`);
    await execute('');
    await execute(`nx pack --args="--output-path=${Process.cwd()}"`);
    const formData = new FormData();
    this.logger.log(`🚀 Publish ${project.name}...`);
    formData.append('file', fs.createReadStream(`${Process.cwd()}/${project.name}.zip`) as any, `${project.name}.zip`);
    await firstValueFrom(this.httpService.post('http://localhost:3333/upload', formData, formData.getHeaders()));
  }
}
