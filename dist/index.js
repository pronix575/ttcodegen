"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const ServiceCreator_1 = require("./services/ServiceCreator");
const ComponentCreator_1 = require("./services/ComponentCreator");
commander_1.program
    .name("ttcodegen")
    .description("Cli for creation effector services © TT-frontend team 2022")
    .version("1.3.7");
commander_1.program
    .command("generate")
    .alias("g")
    .option("--service, -s")
    .option("--component -c")
    .argument("<path>", "Service path")
    .argument("<name>", "Service name")
    .action((path, name, options) => {
    if (options.C) {
        const componentCreator = new ComponentCreator_1.ComponentCreator(path, name);
        componentCreator.createComponent();
    }
    if (options.S) {
        const serviceCreator = new ServiceCreator_1.ServiceCreator(path, name);
        serviceCreator.createService();
    }
});
commander_1.program.parse();
