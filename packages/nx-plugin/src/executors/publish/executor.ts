import { ExecutorContext, runExecutor as run} from '@nrwl/devkit';
import { PublishExecutorSchema } from './schema';
import {execute} from "@pluggy/core";
import {join} from 'path';

export const runExec = async (projectName:string, target:string, context: ExecutorContext) => {
  console.log(`✨ ${target} ${projectName}...`);
  const result = await run({project:projectName, target: target}, {watch:false, progress:false}, context);
  for await (const res of result) {
    if (!res.success) throw new Error(`Failed to run ${projectName} ${target}`);
  }
  return {
    success: true
  };
};

export default async function runExecutor(
  options: PublishExecutorSchema,
  context: ExecutorContext
) {
  const projectOutputPath = context.workspace.projects[context.projectName].targets.build.options.outputPath;
  const pluginDir = join(context.root, projectOutputPath,'..');
  const archive = join(pluginDir, `${context.projectName}.zip`);

  await runExec(context.projectName, 'build', context);
  await runExec(context.projectName, 'pack', context);
  console.log(`✨ publish ${context.projectName}...`);
  await execute(`curl --location --request POST 'http://localhost:3333/upload' \
  --form 'file=@"${archive}"'`);
  return {
    success: true
  };
}

