import Handlebars from "handlebars";

export function renderTemplate<T extends object>(template: string, params: T) {
  const compiledTemplate = Handlebars.compile(template);

  const redneredTemplate = compiledTemplate(params);

  return redneredTemplate;
}
