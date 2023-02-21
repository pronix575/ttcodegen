import { TemplateEngine } from "../template/template.types";

export interface CoreStartupConfig {
  templateEngine: TemplateEngine;
}

export interface Core {
  render(): Core;
}
