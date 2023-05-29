import { createCommand } from "commander";
import { TTCodegenConfig } from "./types";
import { config } from "./config";
import { programDescription, programVersion } from "./constants";

function createProgram(config: TTCodegenConfig) {
  const program = createCommand();

  config.options.forEach(({ option, required, description }) => {
    if (required) {
      program.requiredOption(option, description);
    } else {
      program.option(option, description);
    }
  });

  program.argument("<path>", "Directory path");

  config.arguments.forEach((argument) =>
    program.argument(argument.name, argument.description)
  );

  return program;
}

export async function startCliProgram() {
  if (!config) return;

  const program = createProgram(config)
    .name("ttcodegen")
    .description(programDescription)
    .version(programVersion);

  program.action(() => {
    const [option, ...paramsList] = process.argv?.slice(2, process.argv.length);

    const params = paramsList.reduce((acc, elem, index) => {
      if (index === 0) {
        return {
          path: elem,
        };
      }

      const argumentKey = config?.arguments[index - 1]?.name;

      if (!argumentKey) return acc;

      return { ...acc, [argumentKey]: elem };
    }, {});

    console.log({
      option,
      params,
    });
  });

  await program.parseAsync(process.argv);
}
