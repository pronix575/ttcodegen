import { getFileContent } from "./filesManager";
import { glob } from "glob";
import { findFileTop } from "./utils/findFileTop";
import { TTCodegenConfig } from "./types";
import { ttCodegenConfigSchema } from "./validateSchemas";
import chalk from "chalk";

async function findTtcodegenJson() {
  const bottomFile = (await glob("**/ttcodegen.json"))?.[0] || null;

  if (bottomFile) return bottomFile;

  const topFile = findFileTop("ttcodegen.json");

  return topFile;
}

export async function getConfig(): Promise<TTCodegenConfig | null> {
  const configFilePath = await findTtcodegenJson();

  if (!configFilePath) {
    console.log(
      chalk.redBright(`
⚠️  Can't find a config file ${chalk.yellowBright`"ttcodegen.json"`}
`)
    );

    return null;
  }

  const configFileContent = await getFileContent(configFilePath);

  try {
    const contentJson = JSON.parse(configFileContent);

    ttCodegenConfigSchema.validateSync(contentJson);

    return contentJson;
  } catch (e: any) {
    const validationResult = chalk.redBright(
      e?.errors?.join("\n") || "document format isn't correct"
    );

    console.log(`
⚠️  config is not correct:\n
[ ${validationResult} ]
    `);

    return null;
  }
}
