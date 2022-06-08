import fs from "fs";
import { join } from "path";
import { ServiceContent } from "./ServiceContent";
import { FsCreator } from "./FsCreator";
import { writeError } from "../utils/writeError";
import { ErrorText } from "../utils/errorCodes";

export class ServiceCreator extends FsCreator {
  private servicePath: string = "";
  private readonly extension = "ts";
  private readonly serviceContent: ServiceContent;

  constructor(private readonly path: string, private readonly name: string) {
    super();
    this.servicePath = join("./", this.path, `${this.name}Service`);
    this.serviceContent = new ServiceContent(name);
  }

  createServiceFolder() {
    fs.mkdirSync(this.servicePath, { recursive: true });
    this.addFolder(this.servicePath);
  }

  createViewFolder() {
    const path = join(this.servicePath, "view");
    fs.mkdirSync(path, { recursive: true });
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

  private generateFile(fileType: FileType) {
    const path = join(`${this.servicePath}`, this.getFileName(fileType));

    const serviceContent: { [key: string]: () => string } = {
      [FileType.models]: this.serviceContent.getModels.bind(
        this.serviceContent
      ),
      [FileType.api]: this.serviceContent.getApi.bind(this.serviceContent),
      [FileType.index]: this.serviceContent.getIndex.bind(this.serviceContent),
      [FileType.relations]: this.serviceContent.getRelations.bind(
        this.serviceContent
      ),
      [FileType.conatiner]: this.serviceContent.getContainer.bind(
        this.serviceContent
      ),
      [FileType.types]: this.serviceContent.getTypes.bind(this.serviceContent),
    };

    const generator = serviceContent[fileType];

    fs.writeFileSync(path, generator());

    this.addFile(path);
  }

  createService() {
    if (!this.checkServiceFolderExist()) return;

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

  private getFileName(fileType: FileType) {
    if (fileType === FileType.index) return `${fileType}.${this.extension}`;

    if (fileType === FileType.conatiner)
      return `${this.name}Service.${fileType}.tsx`;

    return `${this.name}Service.${fileType}.${this.extension}`;
  }

  private checkServiceFolderExist() {
    const path = join(this.servicePath, this.name + "Service" + ".models.ts");

    if (fs.existsSync(path)) {
      writeError(ErrorText.SERVICE_ALREADY_EXIST, 1);
      return false;
    }

    return true;
  }
}

enum FileType {
  models = "model",
  index = "index",
  api = "api",
  relations = "relations",
  conatiner = "container",
  types = "types",
}
