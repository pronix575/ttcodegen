import * as path from "path";
import * as fs from "fs";
import * as os from "os";
import { FilesList } from "./types";
import chalk from "chalk";
import { TT_COLOR } from "./constants";

export const slash = os.platform() === "win32" ? `\\` : "/";

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

export function formatTemplatePath(
  fileName: string,
  filePath: string,
  add: string = `.${slash}`
) {
  const fileNameArrayBySlash = fileName.split(slash);

  const fileNameWithoutPath = fileNameArrayBySlash.at(-1);

  const correctFileName = fileNameWithoutPath?.replace(".hbs", "");

  return add + path.join(filePath, correctFileName || "");
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getLastBySep(str: string, sep: string) {
  const arrBySep = str.split(sep);

  return arrBySep.at(-1) || "";
}

export function drawCreatedFiles(files: FilesList) {
  const fileStrings = files.map((file) => {
    const fileName = getLastBySep(file.path, slash);

    const fileExt = getLastBySep(fileName, ".");

    const fileNameWithoutExt = fileName.replace(`.${fileExt}`, "");

    return `${chalk.white`${fileNameWithoutExt}`}${chalk.hex(
      "#3178c6"
    )`.${fileExt}`}`;
  });

  const filesPath = files[0]?.path || "";

  const directoryPath = filesPath.replace(getLastBySep(filesPath, slash), "");

  console.log(chalk.hex(TT_COLOR)`📂 ${directoryPath}\n`);

  console.log(
    fileStrings.map((elem) => chalk.greenBright`+ 📄 ${elem}`).join("\n")
  );
}
