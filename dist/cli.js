"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCliProgram = void 0;
const commander_1 = require("commander");
const config_1 = require("./config");
const constants_1 = require("./constants");
function createProgram(config) {
    const program = (0, commander_1.createCommand)();
    config.options.forEach(({ option, required }) => {
        if (required) {
            program.requiredOption(option);
        }
        else {
            program.option(option);
        }
    });
    config.arguments.forEach((argument) => program.argument(argument.name, argument.description));
    program.on("src", (...data) => console.log(data));
    program.argument("<path>", "Directory path");
    return program;
}
async function startCliProgram() {
    if (!config_1.config)
        return;
    const program = createProgram(config_1.config)
        .name("ttcodegen")
        .description(constants_1.programDescription)
        .version(constants_1.programVersion);
    program.action((path, name, options, data) => {
        // console.log(path, name, options);
    });
    const res = await program.parseAsync(process.argv);
    console.log(res);
}
exports.startCliProgram = startCliProgram;
