"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = exports.getFileContent = void 0;
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("./utils");
async function getFileContent(root) {
    return fs_1.default.readFileSync(root).toString();
}
exports.getFileContent = getFileContent;
function createFile(root, content) {
    (0, utils_1.writeFileSyncRecursive)(root, content);
}
exports.createFile = createFile;
