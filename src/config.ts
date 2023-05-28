import { getFileContent } from "./filesManager";
import { globSync } from "glob";
import { findFileTop } from "./utils/findFileTop";
import { TTCodegenConfig } from "./types";
import { ttCodegenConfigSchema } from "./validateSchemas";
import chalk from "chalk";

function findTtcodegenJson() {
  const bottomFile = globSync("**/ttcodegen.json")?.[0] || null;

  if (bottomFile) return bottomFile;

  const topFile = findFileTop("ttcodegen.json");

  return topFile;
}

export function getConfig(): TTCodegenConfig | null {
  const configFilePath = findTtcodegenJson();

  if (!configFilePath) {
    console.log(
      chalk.redBright(`
⚠️  Can't find a config file ${chalk.yellowBright`"ttcodegen.json"`}
`)
    );

    return null;
  }

  const configFileContent = getFileContent(configFilePath);

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

export const config = getConfig();
