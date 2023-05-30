"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderFiles = void 0;
const glob_1 = require("glob");
const filesManager_1 = require("./filesManager");
const templateEngine_1 = require("./templateEngine");
const path_1 = require("path");
const utils_1 = require("./utils");
const renderFile = async (templatePath, params) => {
    const template = await (0, filesManager_1.getFileContent)(templatePath);
    const content = (0, templateEngine_1.renderTemplate)(template, params);
    const preparedPath = (0, templateEngine_1.renderTemplate)(templatePath, params);
    const formattedPath = (0, utils_1.formatTemplatePath)(preparedPath, (0, path_1.join)(params.path, params.name));
    return { path: formattedPath, content };
};
async function renderFiles({ option, params, config }) {
    const searchPath = `**${utils_1.slash}${config.templatesDirectoryPath}/${option.name}${utils_1.slash}**${utils_1.slash}*.hbs`;
    const templateFilesPaths = await (0, glob_1.glob)(searchPath);
    const files = await Promise.all(templateFilesPaths.map((templatePath) => renderFile(templatePath, params)));
    files.map(({ path, content }) => (0, filesManager_1.createFile)(`${path}`, content));
    (0, utils_1.drawCreatedFiles)(files);
}
exports.renderFiles = renderFiles;
