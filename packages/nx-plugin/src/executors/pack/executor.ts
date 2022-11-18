import { ExecutorContext } from '@nrwl/devkit';
import { PackExecutorSchema } from './schema';
import {join} from 'path';
import {execute} from "@pluggy/core";

export default async function runExecutor(
  options: PackExecutorSchema,
  context: ExecutorContext
) {

  console.log(`🚧 Packing ${context.projectName}...`);
  const projectOutputPath = context.workspace.projects[context.projectName].targets.build.options.outputPath;
  const pluginDir = join(context.root, projectOutputPath,'..');
 
  const archive = join(pluginDir, `${context.projectName}.zip`);

  await execute(`rm -rf ${archive} && cd ${pluginDir}  && zip -r -j ${archive} ${context.projectName}/* && cd -`);

  console.log(`🚀 Packed to ${archive} `);
  return {
    success: true
  };
}

