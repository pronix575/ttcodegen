import fs from "fs";
import { writeFileSyncRecursive } from "./utils";

export async function getFileContent(root: string) {
  return fs.readFileSync(root).toString();
}

export function createFile(root: string, content: string) {
  writeFileSyncRecursive(root, content);
}
