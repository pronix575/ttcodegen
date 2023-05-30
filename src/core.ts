import { glob } from "glob";
import { FileData, Params, RenderProps } from "./types";
import { createFile, getFileContent } from "./filesManager";
import { renderTemplate } from "./templateEngine";
import { join } from "path";
import { drawCreatedFiles, formatTemplatePath } from "./utils";

const renderFile = async (
  templatePath: string,
  params: Params
): Promise<FileData> => {
  const template = await getFileContent(templatePath);

  const content = renderTemplate(template, params);

  const preparedPath = renderTemplate(templatePath, params);

  const formattedPath = formatTemplatePath(
    preparedPath,
    join(params.path, params.name)
  );

  return { path: formattedPath, content };
};

export async function renderFiles({ option, params, config }: RenderProps) {
  const searchPath = `**/${config.templatesDirectoryPath}/${option.name}/**/*.hbs`;

  const templateFilesPaths = await glob(searchPath);

  const files = await Promise.all(
    templateFilesPaths.map((templatePath) => renderFile(templatePath, params))
  );

  files.map(({ path, content }) => createFile(`${path}`, content));

  drawCreatedFiles(files);
}
