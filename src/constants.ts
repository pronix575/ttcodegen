import chalk from "chalk";
import figlet from "figlet";

export const TT_COLOR = "#189EE9";

export const logo = chalk.hex(TT_COLOR)(figlet.textSync("ttcodegen 2.0"));

export const programDescription = `${logo}\n\nCli for creating file structures based on templates © TT-frontend team 2023`;

export const programVersion = "2.0.0-beta-1";

export const initialArguments = [
  {
    name: "path",
    description: "Directory path",
  },
  {
    name: "name",
    description: "Entity name",
  },
];
