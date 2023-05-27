import * as path from "path";
import * as fs from "fs";

export function findFileTop(name: string): string | null {
  let dir: string = __dirname;
  let filePath: string = path.join(dir, name);

  while (!fs.existsSync(filePath)) {
    const parentDir: string = path.dirname(dir);
    if (parentDir === dir) {
      return null;
    }
    dir = parentDir;
    filePath = path.join(dir, name);
  }

  return filePath;
}
