"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const filesManager_1 = require("./filesManager");
const glob_1 = require("glob");
const findFileTop_1 = require("./utils/findFileTop");
function findTtcodegenJson() {
    const bottomFile = (0, glob_1.globSync)("**/ttcodegen.json")?.[0] || null;
    if (bottomFile)
        return bottomFile;
    const topFile = (0, findFileTop_1.findFileTop)("ttcodegen.json");
    return topFile;
}
function getConfig() {
    const configFilePath = findTtcodegenJson();
    if (!configFilePath)
        return null;
    const configFileContent = (0, filesManager_1.getFileContent)(configFilePath);
    try {
        const contentJson = JSON.parse(configFileContent);
        return contentJson;
    }
    catch (e) {
        return null;
    }
}
exports.getConfig = getConfig;
