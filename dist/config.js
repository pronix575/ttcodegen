"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const chalk_1 = __importDefault(require("chalk"));
const glob_1 = require("glob");
const filesManager_1 = require("./filesManager");
const utils_1 = require("./utils");
const validateSchemas_1 = require("./validateSchemas");
async function findTtcodegenJson() {
    const bottomFile = (await (0, glob_1.glob)(`**${utils_1.slash}ttcodegen.json`))?.[0] || null;
    if (bottomFile)
        return bottomFile;
    const topFile = (0, utils_1.findFileTop)("ttcodegen.json");
    return topFile;
}
async function getConfig() {
    const configFilePath = await findTtcodegenJson();
    if (!configFilePath) {
        console.log(chalk_1.default.redBright(`
⚠️  Can't find a config file ${chalk_1.default.yellowBright `"ttcodegen.json"`}
`));
        return null;
    }
    const configFileContent = await (0, filesManager_1.getFileContent)(configFilePath);
    try {
        const contentJson = JSON.parse(configFileContent);
        validateSchemas_1.ttCodegenConfigSchema.validateSync(contentJson);
        return contentJson;
    }
    catch (e) {
        const validationResult = chalk_1.default.redBright(e?.errors?.join("\n") || "document format isn't correct");
        console.log(`
⚠️  config is not correct:\n
[ ${validationResult} ]
    `);
        return null;
    }
}
exports.getConfig = getConfig;
