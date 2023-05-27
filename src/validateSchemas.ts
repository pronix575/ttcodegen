import * as yup from "yup";

export const ttCodegenConfigSchema = yup.object({
  cli: yup
    .object({
      options: yup.array(yup.string().required()).required(),
      path: yup.string().required(),
      name: yup.string().required(),
    })
    .required(),
});
