import fs from "fs";

export async function getFileContent(root: string) {
  return fs.readFileSync(root).toString();
}

export async function createFile(root: string, content: string) {
  fs.writeFileSync(root, content);
}
