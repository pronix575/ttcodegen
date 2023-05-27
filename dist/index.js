"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const ServiceCreator_1 = require("./services/ServiceCreator");
const ComponentCreator_1 = require("./services/ComponentCreator");
const figlet_1 = __importDefault(require("figlet"));
const chalk_1 = __importDefault(require("chalk"));
const config_1 = require("./config");
const logo = chalk_1.default.hex("#189EE9")(figlet_1.default.textSync("ttcodegen"));
commander_1.program
    .name("ttcodegen")
    .description(`${logo}\n\nCli for creating effector services © TT-frontend team 2022`)
    .version("1.4.4");
commander_1.program
    .option("--service, -s")
    .option("--component, -c")
    .option("--req")
    .argument("<path>", "Service path")
    .argument("<name>", "Service name")
    .action((path, name, options) => {
    console.log(path, name, options);
    if (options.C) {
        const componentCreator = new ComponentCreator_1.ComponentCreator(path, name);
        componentCreator.createComponent();
    }
    if (options.S) {
        const serviceCreator = new ServiceCreator_1.ServiceCreator(path, name);
        serviceCreator.createService();
    }
});
// program.parse();
console.log((0, config_1.getConfig)());
console.log(__dirname);
