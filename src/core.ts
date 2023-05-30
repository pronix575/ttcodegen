import { glob } from "glob";
import { CliOption, TTCodegenConfig } from "./types";
import { createFile, getFileContent } from "./filesManager";
import { renderTemplate } from "./templateEngine";
import { join } from "path";
import chalk from "chalk";
import { formatTemplatePath } from "./utils";

interface RenderProps {
  config: TTCodegenConfig;
  option: CliOption;
  params: {
    [key: string]: string;
  };
}

export async function renderFiles({ option, params, config }: RenderProps) {
  const searchPath = `**/${config.templatesDirectoryPath}/${option.name}/**/*.hbs`;

  const templateFilesPaths = await glob(searchPath);

  console.log(params)

  const files = await Promise.all(
    templateFilesPaths.map(async (templatePath) => {
      const template = await getFileContent(templatePath);

      const content = renderTemplate(template, params);

      const preparedPath = renderTemplate(templatePath, params);

      const formattedPath = formatTemplatePath(
        preparedPath,
        join(params.path, params.name)
      );

      return { path: formattedPath, content };
    })
  );

  files.map(({ path, content }) => createFile(`${path}`, content));

  console.log(files.map((elem) => chalk.greenBright`${elem.path}`).join("\n"));
}
