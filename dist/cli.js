"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCliProgram = void 0;
const commander_1 = require("commander");
const config_1 = require("./config");
const constants_1 = require("./constants");
function createProgram(config) {
    const program = (0, commander_1.createCommand)();
    config.options.forEach(({ option, required, description }) => {
        if (required) {
            program.requiredOption(option, description);
        }
        else {
            program.option(option, description);
        }
    });
    program.argument("<path>", "Directory path");
    config.arguments.forEach((argument) => program.argument(argument.name, argument.description));
    return program;
}
async function startCliProgram() {
    if (!config_1.config)
        return;
    const program = createProgram(config_1.config)
        .name("ttcodegen")
        .description(constants_1.programDescription)
        .version(constants_1.programVersion);
    program.action(() => {
        const [option, ...paramsList] = process.argv?.slice(2, process.argv.length);
        const params = paramsList.reduce((acc, elem, index) => {
            if (index === 0) {
                return {
                    path: elem,
                };
            }
            const argumentKey = config_1.config?.arguments[index - 1]?.name;
            if (!argumentKey)
                return acc;
            return { ...acc, [argumentKey]: elem };
        }, {});
        console.log({
            option,
            params,
        });
    });
    await program.parseAsync(process.argv);
}
exports.startCliProgram = startCliProgram;
