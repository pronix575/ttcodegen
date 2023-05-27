import fs from "fs";

export function getFileContent(root: string) {
  return fs.readFileSync(root).toString();
}

export function createFile(root: string, content: string) {
  fs.writeFileSync(root, content);
}
