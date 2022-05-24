import { program } from "commander";
import { ServiceCreator } from "./services/ServiceCreator";
import { ComponentCreator } from "./services/ComponentCreator";

program
  .name("ttcodegen")
  .description("Cli for creation effector services © TT-frontend team 2022")
  .version("1.3.7");

program
  .command("generate")
  .alias("g")
  .option("--service, -s")
  .option("--component -c")
  .argument("<path>", "Service path")
  .argument("<name>", "Service name")
  .action((path, name, options) => {
    if (options.C) {
      const componentCreator = new ComponentCreator(path, name);

      componentCreator.createComponent();
    }

    if (options.S) {
      const serviceCreator = new ServiceCreator(path, name);

      serviceCreator.createService();
    }
  });

program.parse();
