import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Lütfen bir eposta girin")
    .email("Lütfen geçerli bir eposta adresi girin"),
  password: yup.string().required("Lütfen bir şifre girin"),
});
