import { Core, CoreStartupConfig } from "./core.types";

function createCore({}: CoreStartupConfig): Core {
  return {
    render() {
      return this;
    },
  };
}

export class CoreModule {
  static createCore = createCore;
}
