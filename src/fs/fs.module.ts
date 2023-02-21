import { Fs, FsSturtupConfig } from "./fs.types";

function createFs({}: FsSturtupConfig): Fs {
  return {};
}

export class FsModule {
  static createFs = createFs;
}
