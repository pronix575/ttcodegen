"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeError = void 0;
const chalk_1 = __importDefault(require("chalk"));
const writeError = (text, code) => console.error(chalk_1.default.bgRed("ERROR"), chalk_1.default.redBright(text), code && `${chalk_1.default.gray("code:")} ${chalk_1.default.whiteBright(code)}`);
exports.writeError = writeError;
