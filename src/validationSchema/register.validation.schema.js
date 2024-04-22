import * as yup from "yup";

export const registerValidationSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required.")
    .trim()
    .max(50, "First name must be at max 50 characters.")
    .min(3, "First name must be atleast 3 characters."),

  lastName: yup
    .string()
    .required("Last name is required.")
    .trim()
    .max(50, "Last name must be at max 50 characters.")
    .min(2, "Last name must be atleast 2 characters."),
  email: yup
    .string()
    .email("Enter valid email.")
    .required("Email is required.")
    .trim()
    .max(50, "Email must be at max 50 characters."),
  password: yup
    .string()
    .required("Password is required.")
    .trim()
    .max(20, "Password must be at max 20 characters.")
    .min(5, "Password must be atleast 5 characters."),
  role: yup
    .string()
    .oneOf(["buyer", "seller", "user"])
    .required("Role is required."),
  gender: yup
    .string()
    .oneOf(["male", "female", "preferNotToSay"])
    .required("Gender is required."),
});
