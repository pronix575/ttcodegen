import { program } from "commander";
import { ServiceCreator } from "./services/ServiceCreator";
import { ComponentCreator } from "./services/ComponentCreator";
import figlet from "figlet";
import chalk from "chalk";
import { getConfig } from "./config";

const logo = chalk.hex("#189EE9")(figlet.textSync("ttcodegen"));

program
  .name("ttcodegen")
  .description(
    `${logo}\n\nCli for creating effector services © TT-frontend team 2022`
  )
  .version("2.0.0-beta-1");

program
  .option("--service, -s")
  .option("--component, -c")
  .option("--req")
  .argument("<path>", "Service path")
  .argument("<name>", "Service name")
  .action((path, name, options) => {
    console.log(path, name, options);
    if (options.C) {
      const componentCreator = new ComponentCreator(path, name);

      componentCreator.createComponent();
    }

    if (options.S) {
      const serviceCreator = new ServiceCreator(path, name);

      serviceCreator.createService();
    }
  });

// program.parse();

console.log(getConfig());
