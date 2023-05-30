import * as path from "path";
import * as fs from "fs";
import { FilesList } from "./types";
import chalk from "chalk";

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

export function writeFileSyncRecursive(
  filename: string,
  content: string,
  charset: "utf8" = "utf8"
) {
  // -- normalize path separator to '/' instead of path.sep,
  // -- as / works in node for Windows as well, and mixed \\ and / can appear in the path
  let filepath = filename.replace(/\\/g, "/");

  // -- preparation to allow absolute paths as well
  let root = "";
  if (filepath[0] === "/") {
    root = "/";
    filepath = filepath.slice(1);
  } else if (filepath[1] === ":") {
    root = filepath.slice(0, 3); // c:\
    filepath = filepath.slice(3);
  }

  // -- create folders all the way down
  const folders = filepath.split("/").slice(0, -1); // remove last item, file
  folders.reduce(
    (acc, folder) => {
      const folderPath = acc + folder + "/";
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
      return folderPath;
    },
    root // first 'acc', important
  );

  // -- write file
  fs.writeFileSync(root + filepath, content, charset);
}

export function formatTemplatePath(fileName: string, filePath: string) {
  const fileNameArrayBySlash = fileName.split("/");

  const fileNameWithoutPath = fileNameArrayBySlash.at(-1);

  const correctFileName = fileNameWithoutPath?.replace(".hbs", "");

  return "./" + path.join(filePath, correctFileName || "");
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function drawCreatedFiles(files: FilesList) {
  console.log(files.map((elem) => chalk.greenBright`${elem.path}`).join("\n"));
}