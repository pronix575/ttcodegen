"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceContent = void 0;
class ServiceContent {
    constructor(name) {
        this.name = name;
        this.serviceName = `${name}Service`;
    }
    getIndex() {
        return `export { ${this.serviceName} } from "./${this.serviceName}.models.ts
export { ${capitalizeFirstLetter(this.name)}Container } from "./${this.serviceName}.tsx"
"`;
    }
    getModels() {
        return `import { createDomain } from 'effector';

const ${this.serviceName}Domain = createDomain(
  '${this.serviceName}'
);

export const ${this.serviceName} = {
  inputs: {
  
  },
  outputs: {

  },
};
`;
    }
    getApi() {
        return `import { axios } from '01/axios';`;
    }
    getRelations() {
        return "";
    }
    getContainer() {
        return `import React from "react"

export const ${capitalizeFirstLetter(this.name)}Conatiner = () => {
  return <></>
}
`;
    }
}
exports.ServiceContent = ServiceContent;
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
