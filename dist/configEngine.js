"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fsEngine_1 = require("./fsEngine");
function findTtcodegenJson(dir) {
    const files = fs_1.default.readdirSync(dir);
    for (const file of files) {
        const filePath = path_1.default.join(dir, file);
        const stat = fs_1.default.statSync(filePath);
        if (stat.isDirectory()) {
            const ttcodegenJson = findTtcodegenJson(filePath);
            if (ttcodegenJson) {
                return ttcodegenJson;
            }
        }
        else if (file === "ttcodegen.json") {
            return filePath;
        }
    }
    return null;
}
function getConfig() {
    const configFilePath = findTtcodegenJson(".");
    if (!configFilePath)
        return null;
    const configFileContent = (0, fsEngine_1.getFileContent)(configFilePath);
    try {
        const contentJson = JSON.parse(configFileContent);
        return contentJson;
    }
    catch (e) {
        return null;
    }
}
exports.getConfig = getConfig;
