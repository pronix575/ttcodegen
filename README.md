![](/assets/logo.png)
# ttcodegen
![](https://img.shields.io/github/package-json/v/pronix575/ttcodegen) ![](https://img.shields.io/npm/dt/@pronix/ttcodegen.svg)

# Cli for simple creation effector-services and React-components

## Installation

```bash
npm i -g @pronix/ttcodegen
```

## Basic usage:

### 1. Creation of service

```bash
ttcodegen generate --service ./src/services/users createUser
# or
ttc g -s ./src/services/users createUser
```

### 2. Creation of component
```bash
ttcodegen generate --component ./src/services/users/views CreateUserModal
# or
ttc g -c ./src/services/users/views CreateUserModal
```

> example

- createUserService
  - displayUserService
  - displayUsersListService
  - createUserService
    - createUserService.models.ts
    - createUserService.conainer.tsx
    - createUserService.relations.ts
    - createUserService.types.ts
    - createUserService.container.ts
    - createUserService.api.ts
    - views 
      - CreateUserForm
          - CreateUserForm
          - CreateUserForm.tsx
          - CreateUserForm.styled.ts
          - CreateUserForm.types.ts
      - CreateUserModal.tsx
      - CreateUserModal.types.ts
      - CreateUserModal.styled.ts