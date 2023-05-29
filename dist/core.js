"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderFiles = void 0;
const glob_1 = require("glob");
const filesManager_1 = require("./filesManager");
const templateEngine_1 = require("./templateEngine");
const path_1 = __importDefault(require("path"));
function formatTemplatePath(fileName, filePath) {
    const fileNameArrayBySlash = fileName.split("/");
    const fileNameWithoutPath = fileNameArrayBySlash.at(-1);
    const correctFileName = fileNameWithoutPath?.replace(".hbs", "");
    return path_1.default.join(filePath, correctFileName || "");
}
async function renderFiles({ option, params, config }) {
    const searchPath = `${config.templatesDirectoryPath}/${option.name}/**/*.hbs`;
    const templateFilesPaths = await (0, glob_1.glob)(searchPath);
    const files = await Promise.all(templateFilesPaths.map(async (templatePath) => {
        const template = await (0, filesManager_1.getFileContent)(templatePath);
        const content = (0, templateEngine_1.renderTemplate)(template, params);
        const preparedPath = (0, templateEngine_1.renderTemplate)(templatePath, params);
        const path = formatTemplatePath(preparedPath, params.path);
        return { path, content };
    }));
    console.log(files);
}
exports.renderFiles = renderFiles;
