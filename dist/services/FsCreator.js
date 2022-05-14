"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FsCreator = void 0;
const chalk_1 = __importDefault(require("chalk"));
class FsCreator {
    constructor() {
        this.files = [];
        this.folder = [];
    }
    addFolder(path) {
        this.folder.push(path);
    }
    addFile(path) {
        this.files.push(path);
    }
    writeLog() {
        console.log(chalk_1.default.gray("folders created:"));
        this.folder.forEach((path) => {
            console.log(chalk_1.default.bgBlue("ADD"), chalk_1.default.blueBright(path));
        });
        console.log(chalk_1.default.gray("\nfiles created:"));
        this.files.forEach((path) => {
            console.log(chalk_1.default.bgGreen("ADD"), chalk_1.default.greenBright(path));
        });
    }
}
exports.FsCreator = FsCreator;
