export interface CliOption {
  name: string;
  option: string;
  required: boolean;
  description: string;
}

export interface CliArgument {
  name: string;
  description?: string;
}

export interface TTCodegenConfig {
  options: CliOption[];
  arguments: CliArgument[];
  templatesDirectoryPath: string;
}

export interface FileData {
  path: string;
  content: string;
}

export type FilesList = FileData[];

export interface Params {
  [key: string]: string;
}

export interface RenderProps {
  config: TTCodegenConfig;
  option: CliOption;
  params: Params;
}
