"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCliProgram = void 0;
const commander_1 = require("commander");
const config_1 = require("./config");
const constants_1 = require("./constants");
const core_1 = require("./core");
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
    [...constants_1.initialArguments, ...config.arguments].forEach((argument) => program.argument(argument.name, argument.description));
    return program;
}
async function startCliProgram() {
    const config = await (0, config_1.getConfig)();
    if (!config)
        return;
    const program = createProgram(config)
        .name("ttcodegen")
        .description(constants_1.programDescription)
        .version(constants_1.programVersion);
    program.action(() => {
        const [optionCommand, ...paramsList] = process.argv?.slice(2, process.argv.length);
        const params = paramsList.reduce((acc, elem, index) => {
            const initialArgument = constants_1.initialArguments[index];
            if (initialArgument) {
                return {
                    ...acc,
                    [initialArgument.name]: elem,
                };
            }
            const argumentKey = config?.arguments[index - 1]?.name;
            if (!argumentKey)
                return acc;
            return { ...acc, [argumentKey]: elem };
        }, {});
        const option = config?.options.find((elem) => elem.option === optionCommand);
        if (!option)
            return;
        (0, core_1.renderFiles)({ option, params, config });
    });
    await program.parseAsync(process.argv);
}
exports.startCliProgram = startCliProgram;
