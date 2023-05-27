"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCliProgram = void 0;
const commander_1 = require("commander");
const config_1 = require("./config");
const constants_1 = require("./constants");
function createProgram(config) {
    const program = (0, commander_1.createCommand)();
    config.options.forEach(({ option }) => program.option(option));
    config.arguments.forEach((argument) => program.argument(argument.name, argument.description));
    return program;
}
function startCliProgram() {
    const config = (0, config_1.getConfig)();
    if (!config)
        return;
    const program = createProgram(config)
        .name("ttcodegen")
        .description(constants_1.programDescription)
        .version(constants_1.programVersion);
    program.action((path, name, options) => {
        console.log(path, name, options);
    });
    program.parse();
}
exports.startCliProgram = startCliProgram;
