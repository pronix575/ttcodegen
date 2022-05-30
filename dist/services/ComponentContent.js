"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentContent = void 0;
class ComponentContent {
    constructor(name) {
        this.name = name;
        this.componentName = `${name}`;
    }
    getIndex() {
        return `export { ${this.componentName} } from './${this.componentName}'`;
    }
    getCoponent() {
        return `import React, { FC } from 'react';
import { Wrapper } from './${this.componentName}.styled';
import { ${this.componentName}Props } from './${this.componentName}.types';

export const ${this.componentName}: FC<${this.componentName}Props> = ({}) => {
  return <Wrapper></Wrapper>
};
`;
    }
    getStyled() {
        return `import styled from 'styled-components'

export const Wrapper = styled.div${"``"}
`;
    }
    getTypes() {
        return `export type ${this.componentName}Props = {
  
};`;
    }
}
exports.ComponentContent = ComponentContent;
