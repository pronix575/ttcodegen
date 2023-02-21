import { TemplateEngine } from "./template.types";

function createTeplateEngine(): TemplateEngine {
  return {};
}

export class TemplateModule {
  static createTeplateEngine = createTeplateEngine;
}
