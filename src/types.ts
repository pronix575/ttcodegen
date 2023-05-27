export interface CliConfiguration {
  options: string[];
  path: string;
  name: string;
}

export interface TTCodegenConfig {
  cli: CliConfiguration;
}
