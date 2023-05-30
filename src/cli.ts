import { createCommand } from "commander";
import { Params, TTCodegenConfig } from "./types";
import { getConfig } from "./config";
import {
  initialArguments,
  programDescription,
  programVersion,
} from "./constants";
import { renderFiles } from "./core";

function createProgram(config: TTCodegenConfig) {
  const program = createCommand();

  config.options.forEach(({ option, required, description }) => {
    if (required) {
      program.requiredOption(option, description);
    } else {
      program.option(option, description);
    }
  });

  [...initialArguments, ...config.arguments].forEach((argument) =>
    program.argument(argument.name, argument.description)
  );

  return program;
}

export async function startCliProgram() {
  const config = await getConfig();

  if (!config) return;

  const program = createProgram(config)
    .name("ttcodegen")
    .description(programDescription)
    .version(programVersion);

  program.action(() => {
    const [optionCommand, ...paramsList] = process.argv?.slice(
      2,
      process.argv.length
    );

    const params: Params = paramsList.reduce((acc, elem, index) => {
      const initialArgument = initialArguments[index];

      if (initialArgument) {
        return {
          ...acc,
          [initialArgument.name]: elem,
        };
      }

      const argumentKey = config?.arguments[index - 1]?.name;

      if (!argumentKey) return acc;

      return { ...acc, [argumentKey]: elem };
    }, {});

    const option = config?.options.find(
      (elem) => elem.option === optionCommand
    );

    if (!option) return;

    renderFiles({ option, params, config });
  });

  await program.parseAsync(process.argv);
}
