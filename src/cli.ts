import { createCommand } from "commander";
import { TTCodegenConfig } from "./types";
import { getConfig } from "./config";
import { programDescription, programVersion } from "./constants";

function createProgram(config: TTCodegenConfig) {
  const program = createCommand();

  config.options.forEach(({ option }) => program.option(option));
  config.arguments.forEach((argument) =>
    program.argument(argument.name, argument.description)
  );

  return program;
}

export function startCliProgram() {
  const config = getConfig();

  if (!config) return;

  const program = createProgram(config)
    .name("ttcodegen")
    .description(programDescription)
    .version(programVersion);

  program.action((path, name, options) => {
    console.log(path, name, options);
  });

  program.parse();
}
