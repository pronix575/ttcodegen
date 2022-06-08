"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCreator = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const ServiceContent_1 = require("./ServiceContent");
const FsCreator_1 = require("./FsCreator");
const writeError_1 = require("../utils/writeError");
const errorCodes_1 = require("../utils/errorCodes");
class ServiceCreator extends FsCreator_1.FsCreator {
    constructor(path, name) {
        super();
        this.path = path;
        this.name = name;
        this.servicePath = "";
        this.extension = "ts";
        this.servicePath = (0, path_1.join)("./", this.path, `${this.name}Service`);
        this.serviceContent = new ServiceContent_1.ServiceContent(name);
    }
    createServiceFolder() {
        fs_1.default.mkdirSync(this.servicePath, { recursive: true });
        this.addFolder(this.servicePath);
    }
    createViewFolder() {
        const path = (0, path_1.join)(this.servicePath, "view");
        fs_1.default.mkdirSync(path, { recursive: true });
        this.addFolder(path);
    }
    createIndex() {
        this.generateFile(FileType.index);
    }
    createModels() {
        this.generateFile(FileType.models);
    }
    createApi() {
        this.generateFile(FileType.api);
    }
    createRelations() {
        this.generateFile(FileType.relations);
    }
    createContainer() {
        this.generateFile(FileType.conatiner);
    }
    createTypes() {
        this.generateFile(FileType.types);
    }
    generateFile(fileType) {
        const path = (0, path_1.join)(`${this.servicePath}`, this.getFileName(fileType));
        const serviceContent = {
            [FileType.models]: this.serviceContent.getModels.bind(this.serviceContent),
            [FileType.api]: this.serviceContent.getApi.bind(this.serviceContent),
            [FileType.index]: this.serviceContent.getIndex.bind(this.serviceContent),
            [FileType.relations]: this.serviceContent.getRelations.bind(this.serviceContent),
            [FileType.conatiner]: this.serviceContent.getContainer.bind(this.serviceContent),
            [FileType.types]: this.serviceContent.getTypes.bind(this.serviceContent),
        };
        const generator = serviceContent[fileType];
        fs_1.default.writeFileSync(path, generator());
        this.addFile(path);
    }
    createService() {
        if (!this.checkServiceFolderExist())
            return;
        this.createServiceFolder();
        this.createViewFolder();
        this.createIndex();
        this.createModels();
        this.createApi();
        this.createRelations();
        this.createContainer();
        this.createTypes();
        this.writeLog();
    }
    getFileName(fileType) {
        if (fileType === FileType.index)
            return `${fileType}.${this.extension}`;
        if (fileType === FileType.conatiner)
            return `${this.name}Service.${fileType}.tsx`;
        return `${this.name}Service.${fileType}.${this.extension}`;
    }
    checkServiceFolderExist() {
        const path = (0, path_1.join)(this.servicePath, this.name + "Service" + ".models.ts");
        if (fs_1.default.existsSync(path)) {
            (0, writeError_1.writeError)(errorCodes_1.ErrorText.SERVICE_ALREADY_EXIST, 1);
            return false;
        }
        return true;
    }
}
exports.ServiceCreator = ServiceCreator;
var FileType;
(function (FileType) {
    FileType["models"] = "models";
    FileType["index"] = "index";
    FileType["api"] = "api";
    FileType["relations"] = "relations";
    FileType["conatiner"] = "container";
    FileType["types"] = "types";
})(FileType || (FileType = {}));
