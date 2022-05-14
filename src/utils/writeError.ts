import chalk from "chalk";

export const writeError = (text: string, code?: number) =>
  console.error(
    chalk.bgRed("ERROR"),
    chalk.redBright(text),
    code && `${chalk.gray("code:")} ${chalk.whiteBright(code)}`
  );
