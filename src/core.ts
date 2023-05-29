import { glob } from "glob";
import { CliOption, TTCodegenConfig } from "./types";
import { getFileContent } from "./filesManager";
import { renderTemplate } from "./templateEngine";
import path from "path";

interface RenderProps {
  config: TTCodegenConfig;
  option: CliOption;
  params: {
    [key: string]: string;
  };
}

function formatTemplatePath(fileName: string, filePath: string) {
  const fileNameArrayBySlash = fileName.split("/");

  const fileNameWithoutPath = fileNameArrayBySlash.at(-1);

  const correctFileName = fileNameWithoutPath?.replace(".hbs", "");

  return path.join(filePath, correctFileName || "");
}

export async function renderFiles({ option, params, config }: RenderProps) {
  const searchPath = `${config.templatesDirectoryPath}/${option.name}/**/*.hbs`;

  const templateFilesPaths = await glob(searchPath);

  const files = await Promise.all(
    templateFilesPaths.map(async (templatePath) => {
      const template = await getFileContent(templatePath);

      const content = renderTemplate(template, params);

      const preparedPath = renderTemplate(templatePath, params);

      const path = formatTemplatePath(preparedPath, params.path);

      return { path, content };
    })
  );

  console.log(files);
}
