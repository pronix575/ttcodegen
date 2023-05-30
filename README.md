![](/assets/logo.png)
# ttcodegen
![](https://img.shields.io/github/package-json/v/pronix575/ttcodegen) ![](https://img.shields.io/npm/dt/@pronix/ttcodegen.svg)

# Cli for creating file structures based on templates

## Installation

```bash
npm i -g @pronix/ttcodegen
```

## Using:

### 1. Create ttcodegen.json configuration file

```json
{
  "templatesDirectoryPath": "./templates",
  "arguments": [],
  "options": [
    {
      "name": "component",
      "option": "-C",
      "description": "Create react component"
    },
    {
      "name": "service",
      "option": "-S",
      "description": "Create effector service"
    }
  ]
}

```

### 2. Create template files in directory with any option name
> "./ttc/templates/service/{{name}}Service.container.tsx.hbs"
```hbs
import React from 'react';
import { {{ name }}Service } from './{{ name }}Service.models';

const { inputs, outputs } = {{ name }}Service;

export const {{ cfl name }}Container = () => {
  return <></>;
};
```
![](/assets/ttcFiles.png)

### 3. Run ttc

```bash
$ ttc -S ./src/services createTask

📂 ./src/services/applyTask/

+ 📄 applyTaskService.types.ts
+ 📄 applyTaskService.models.ts
+ 📄 applyTaskService.container.tsx
+ 📄 applyTaskService.api.ts
+ 📄 index.ts
```