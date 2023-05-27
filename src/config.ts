import { getFileContent } from "./filesManager";
import { globSync } from "glob";
import { findFileTop } from "./utils/findFileTop";

function findTtcodegenJson() {
  const bottomFile = globSync("**/ttcodegen.json")?.[0] || null;

  if (bottomFile) return bottomFile;

  const topFile = findFileTop("ttcodegen.json");

  return topFile;
}

export function getConfig() {
  const configFilePath = findTtcodegenJson();

  if (!configFilePath) return null;

  const configFileContent = getFileContent(configFilePath);

  try {
    const contentJson = JSON.parse(configFileContent);

    return contentJson;
  } catch (e) {
    return null;
  }
}
