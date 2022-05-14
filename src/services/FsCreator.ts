import chalk from "chalk";

export class FsCreator {
  private readonly files: string[] = [];
  private readonly folder: string[] = [];

  addFolder(path: string) {
    this.folder.push(path);
  }

  addFile(path: string) {
    this.files.push(path);
  }

  writeLog() {
    console.log(chalk.gray("folders created:"));
    this.folder.forEach((path) => {
      console.log(chalk.bgBlue("ADD"), chalk.blueBright(path));
    });

    console.log(chalk.gray("\nfiles created:"));
    this.files.forEach((path) => {
      console.log(chalk.bgGreen("ADD"), chalk.greenBright(path));
    });
  }
}
