export class ComponentContent {
  componentName: string;

  constructor(private readonly name: string) {
    this.componentName = `${name}`;
  }

  getIndex() {
    return `export { ${this.componentName} } from "./${this.componentName}"`;
  }

  getCoponent() {
    return `import React, { FC } from "react"
import { Wrapper } from "./${this.componentName}.styled"

export const ${this.componentName}: FC = ({}) => {
  return <Wrapper></Wrapper>
};
`;
  }

  getStyled() {
    return `import styled from 'styled-components'

export const Wrapper = styled.div${"``"}
`;
  }
}
