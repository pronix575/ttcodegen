import { glob } from "glob";
import { CliOption, TTCodegenConfig } from "./types";
import { createFile, getFileContent } from "./filesManager";
import { renderTemplate } from "./templateEngine";
import { join } from "path";
import chalk from "chalk";

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

  return "./" + join(filePath, correctFileName || "");
}

export async function renderFiles({ option, params, config }: RenderProps) {
  const searchPath = `**/${config.templatesDirectoryPath}/${option.name}/**/*.hbs`;

  const templateFilesPaths = await glob(searchPath);

  const files = await Promise.all(
    templateFilesPaths.map(async (templatePath) => {
      const template = await getFileContent(templatePath);

      const content = renderTemplate(template, params);

      const preparedPath = renderTemplate(templatePath, params);

      const path = formatTemplatePath(
        preparedPath,
        join(params.path, params.name)
      );

      return { path, content };
    })
  );

  files.forEach(({ path, content }) => createFile(`${path}`, content));

  console.log(files.map((elem) => chalk.greenBright`${elem.path}`).join("\n"));
}
