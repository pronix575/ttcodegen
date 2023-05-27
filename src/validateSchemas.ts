import * as yup from "yup";
import { TTCodegenConfig } from "./types";

const cliOptionSchema = yup
  .object({
    name: yup.string().required(),
    option: yup.string().required(),
  })
  .required();

const cliArgumentSchema = yup
  .object({
    name: yup.string().required(),
    description: yup.string(),
  })
  .required();

export const ttCodegenConfigSchema = yup.object({
  options: yup.array(cliOptionSchema).required(),
  arguments: yup.array(cliArgumentSchema).required(),
  templatesDirectoryPath: yup.string().required(),
});
