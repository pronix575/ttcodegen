"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentCreator = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const ComponentContent_1 = require("./ComponentContent");
const FsCreator_1 = require("./FsCreator");
const writeError_1 = require("../utils/writeError");
const errorCodes_1 = require("../utils/errorCodes");
class ComponentCreator extends FsCreator_1.FsCreator {
    constructor(path, name) {
        super();
        this.path = path;
        this.name = name;
        this.servicePath = "";
        this.extension = "ts";
        this.servicePath = (0, path_1.join)("./", this.path, `${this.name}`);
        this.componentContent = new ComponentContent_1.ComponentContent(name);
    }
    createComponentFolder() {
        fs_1.default.mkdirSync(this.servicePath, { recursive: true });
        this.addFolder(this.servicePath);
    }
    createIndex() {
        this.generateFile(FileType.index);
    }
    createComponentFile() {
        this.generateFile(FileType.component);
    }
    createStyled() {
        this.generateFile(FileType.styled);
    }
    createTypes() {
        this.generateFile(FileType.types);
    }
    generateFile(fileType) {
        const path = (0, path_1.join)(`${this.servicePath}`, this.getFileName(fileType));
        const serviceContent = {
            [FileType.component]: this.componentContent.getCoponent.bind(this.componentContent),
            [FileType.styled]: this.componentContent.getStyled.bind(this.componentContent),
            [FileType.index]: this.componentContent.getIndex.bind(this.componentContent),
            [FileType.types]: this.componentContent.getIndex.bind(this.componentContent),
        };
        const generator = serviceContent[fileType];
        fs_1.default.writeFileSync(path, generator());
        this.addFile(path);
    }
    createComponent() {
        if (!this.checkComponentFolderExist())
            return;
        if (!this.checkComponentName())
            return;
        this.createComponentFolder();
        this.createIndex();
        this.createComponentFile();
        this.createStyled();
        this.createTypes();
        this.writeLog();
    }
    getFileName(fileType) {
        if (fileType === FileType.index)
            return `${fileType}.${this.extension}`;
        if (fileType === FileType.component)
            return `${this.name}.tsx`;
        return `${this.name}.${fileType}.${this.extension}`;
    }
    checkComponentFolderExist() {
        if (fs_1.default.existsSync((0, path_1.join)(this.servicePath))) {
            (0, writeError_1.writeError)(errorCodes_1.ErrorText.COMPONENT_ALREADY_EXIST, 2);
            return false;
        }
        return true;
    }
    checkComponentName() {
        const character = this.name[0];
        if (character !== character.toUpperCase()) {
            (0, writeError_1.writeError)(errorCodes_1.ErrorText.COMPONENT_NAME_IS_LOWERCASE, 3);
            return false;
        }
        return true;
    }
}
exports.ComponentCreator = ComponentCreator;
var FileType;
(function (FileType) {
    FileType["styled"] = "styled";
    FileType["index"] = "index";
    FileType["component"] = "component";
    FileType["types"] = "types";
})(FileType || (FileType = {}));
