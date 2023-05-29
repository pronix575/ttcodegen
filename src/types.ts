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
