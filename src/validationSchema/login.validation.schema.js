import * as yup from "yup";

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required.")
    .trim()
    .email("Must be a valid email address"),
  password: yup.string().required("Password is required."),
});
