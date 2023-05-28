import { createCommand } from "commander";
import { TTCodegenConfig } from "./types";
import { config } from "./config";
import { programDescription, programVersion } from "./constants";

function createProgram(config: TTCodegenConfig) {
  const program = createCommand();

  config.options.forEach(({ option, required }) => {
    if (required) {
      program.requiredOption(option);
    } else {
      program.option(option);
    }
  });
  config.arguments.forEach((argument) =>
    program.argument(argument.name, argument.description)
  );

  program.on("src", (...data) => console.log(data));

  program.argument("<path>", "Directory path");

  return program;
}

export async function startCliProgram() {
  if (!config) return;

  const program = createProgram(config)
    .name("ttcodegen")
    .description(programDescription)
    .version(programVersion);

  program.action((path, name, options, data) => {
    // console.log(path, name, options);
  });

  const res = await program.parseAsync(process.argv);

  console.log(res);
}
