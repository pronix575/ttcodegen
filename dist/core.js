"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderFiles = void 0;
const glob_1 = require("glob");
const filesManager_1 = require("./filesManager");
const templateEngine_1 = require("./templateEngine");
const path_1 = require("path");
const chalk_1 = __importDefault(require("chalk"));
const utils_1 = require("./utils");
async function renderFiles({ option, params, config }) {
    const searchPath = `**/${config.templatesDirectoryPath}/${option.name}/**/*.hbs`;
    const templateFilesPaths = await (0, glob_1.glob)(searchPath);
    const files = await Promise.all(templateFilesPaths.map(async (templatePath) => {
        const template = await (0, filesManager_1.getFileContent)(templatePath);
        const content = (0, templateEngine_1.renderTemplate)(template, params);
        const preparedPath = (0, templateEngine_1.renderTemplate)(templatePath, params);
        const formattedPath = (0, utils_1.formatTemplatePath)(preparedPath, (0, path_1.join)(params.path, params.name));
        return { path: formattedPath, content };
    }));
    files.map(({ path, content }) => (0, filesManager_1.createFile)(`${path}`, content));
    console.log(files.map((elem) => chalk_1.default.greenBright `${elem.path}`).join("\n"));
}
exports.renderFiles = renderFiles;
