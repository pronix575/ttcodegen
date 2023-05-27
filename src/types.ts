export interface CliOption {
  name: string;
  option: string;
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
