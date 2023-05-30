import Handlebars from "handlebars";
import { capitalizeFirstLetter } from "./utils";

export function renderTemplate<T extends object>(template: string, params: T) {
  Handlebars.registerHelper("cfl", capitalizeFirstLetter);

  const compiledTemplate = Handlebars.compile(template);

  const redneredTemplate = compiledTemplate(params);

  return redneredTemplate;
}
