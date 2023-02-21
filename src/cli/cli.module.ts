import { Cli, CliStartupConfig } from "./cli.types";

function createCli({}: CliStartupConfig): Cli {
  return {
    startup() {},
  };
}

export class CliModule {
  static createCli = createCli;
}
