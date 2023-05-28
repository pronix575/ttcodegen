export interface CliOption {
  name: string;
  option: string;
  required: boolean;
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
