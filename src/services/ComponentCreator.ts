import fs from "fs";
import { join } from "path";
import { ComponentContent } from "./ComponentContent";
import { FsCreator } from "./FsCreator";
import { writeError } from "../utils/writeError";
import { ErrorText } from "../utils/errorCodes";

export class ComponentCreator extends FsCreator {
  private servicePath: string = "";
  private readonly extension = "ts";
  private readonly componentContent: ComponentContent;

  constructor(private readonly path: string, private readonly name: string) {
    super();
    this.servicePath = join("./", this.path, `${this.name}`);
    this.componentContent = new ComponentContent(name);
  }

  createComponentFolder() {
    fs.mkdirSync(this.servicePath, { recursive: true });
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

  private generateFile(fileType: FileType) {
    const path = join(`${this.servicePath}`, this.getFileName(fileType));

    const serviceContent: { [key: string]: () => string } = {
      [FileType.component]: this.componentContent.getCoponent.bind(
        this.componentContent
      ),
      [FileType.styled]: this.componentContent.getStyled.bind(
        this.componentContent
      ),
      [FileType.index]: this.componentContent.getIndex.bind(
        this.componentContent
      ),
      [FileType.types]: this.componentContent.getTypes.bind(
        this.componentContent
      ),
    };

    const generator = serviceContent[fileType];

    fs.writeFileSync(path, generator());

    this.addFile(path);
  }

  createComponent() {
    if (!this.checkComponentFolderExist()) return;
    if (!this.checkComponentName()) return;

    this.createComponentFolder();

    this.createIndex();
    this.createComponentFile();
    this.createStyled();
    this.createTypes();

    this.writeLog();
  }

  private getFileName(fileType: FileType) {
    if (fileType === FileType.index) return `${fileType}.${this.extension}`;

    if (fileType === FileType.component) return `${this.name}.tsx`;

    return `${this.name}.${fileType}.${this.extension}`;
  }

  private checkComponentFolderExist() {
    if (fs.existsSync(join(this.servicePath))) {
      writeError(ErrorText.COMPONENT_ALREADY_EXIST, 2);
      return false;
    }

    return true;
  }

  private checkComponentName() {
    const character = this.name[0];

    if (character !== character.toUpperCase()) {
      writeError(ErrorText.COMPONENT_NAME_IS_LOWERCASE, 3);
      return false;
    }

    return true;
  }
}

enum FileType {
  styled = "styled",
  index = "index",
  component = "component",
  types = "types",
}
