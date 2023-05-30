"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialArguments = exports.programVersion = exports.programDescription = exports.logo = exports.TT_COLOR = void 0;
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
exports.TT_COLOR = "#189EE9";
exports.logo = chalk_1.default.hex(exports.TT_COLOR)(figlet_1.default.textSync("ttcodegen 2.0"));
exports.programDescription = `${exports.logo}\n\nCli for creating file structures based on templates © TT-frontend team 2023`;
exports.programVersion = "2.0.0-beta-1";
exports.initialArguments = [
    {
        name: "path",
        description: "Directory path",
    },
    {
        name: "name",
        description: "Entity name",
    },
];
