import * as yup from "yup";

export const UserInfoSchema = yup.object().shape({
  username: yup
    .string()
    .max(24, "Kullanıcı adı maksimum 24 karakter olabilir")
    .required("Lütfen bir kullanıcı adı girin"),
  email: yup
    .string()
    .required("Lütfen bir eposta girin")
    .email("Lütfen geçerli bir eposta adresi girin"),
  email2: yup
    .string()
    .required("Lütfen bir eposta girin")
    .email("Lütfen geçerli bir eposta adresi girin")
    .oneOf([yup.ref("email")], "Eposta adresleri uyusmuyor"),
  exam: yup.string().required("Lütfen bir öğretim tipi seçin"),
  birthdate: yup.date(),
});
