"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawCreatedFiles = exports.capitalizeFirstLetter = exports.formatTemplatePath = exports.writeFileSyncRecursive = exports.findFileTop = exports.slash = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
const chalk_1 = __importDefault(require("chalk"));
const constants_1 = require("./constants");
exports.slash = os.platform() === "win32" ? `\\` : "/";
function findFileTop(name) {
    let dir = __dirname;
    let filePath = path.join(dir, name);
    while (!fs.existsSync(filePath)) {
        const parentDir = path.dirname(dir);
        if (parentDir === dir) {
            return null;
        }
        dir = parentDir;
        filePath = path.join(dir, name);
    }
    return filePath;
}
exports.findFileTop = findFileTop;
function writeFileSyncRecursive(filename, content, charset = "utf8") {
    // -- normalize path separator to '/' instead of path.sep,
    // -- as / works in node for Windows as well, and mixed \\ and / can appear in the path
    let filepath = filename.replace(/\\/g, "/");
    // -- preparation to allow absolute paths as well
    let root = "";
    if (filepath[0] === "/") {
        root = "/";
        filepath = filepath.slice(1);
    }
    else if (filepath[1] === ":") {
        root = filepath.slice(0, 3); // c:\
        filepath = filepath.slice(3);
    }
    // -- create folders all the way down
    const folders = filepath.split("/").slice(0, -1); // remove last item, file
    folders.reduce((acc, folder) => {
        const folderPath = acc + folder + "/";
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
        return folderPath;
    }, root // first 'acc', important
    );
    // -- write file
    fs.writeFileSync(root + filepath, content, charset);
}
exports.writeFileSyncRecursive = writeFileSyncRecursive;
function formatTemplatePath(fileName, filePath, add = `.${exports.slash}`) {
    const fileNameArrayBySlash = fileName.split(exports.slash);
    const fileNameWithoutPath = fileNameArrayBySlash.at(-1);
    const correctFileName = fileNameWithoutPath?.replace(".hbs", "");
    return add + path.join(filePath, correctFileName || "");
}
exports.formatTemplatePath = formatTemplatePath;
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.capitalizeFirstLetter = capitalizeFirstLetter;
function getLastBySep(str, sep) {
    const arrBySep = str.split(sep);
    return arrBySep.at(-1) || "";
}
function drawCreatedFiles(files) {
    const fileStrings = files.map((file) => {
        const fileName = getLastBySep(file.path, exports.slash);
        const fileExt = getLastBySep(fileName, ".");
        const fileNameWithoutExt = fileName.replace(`.${fileExt}`, "");
        return `${chalk_1.default.white `${fileNameWithoutExt}`}${chalk_1.default.hex("#3178c6") `.${fileExt}`}`;
    });
    const filesPath = files[0]?.path || "";
    const directoryPath = filesPath.replace(getLastBySep(filesPath, exports.slash), "");
    console.log(chalk_1.default.hex(constants_1.TT_COLOR) `📂 ${directoryPath}\n`);
    console.log(fileStrings.map((elem) => chalk_1.default.greenBright `+ 📄 ${elem}`).join("\n"));
}
exports.drawCreatedFiles = drawCreatedFiles;
