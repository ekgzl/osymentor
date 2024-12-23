import * as yup from "yup";

export const SignupSchema = yup.object().shape({
  email: yup
    .string()
    .required("Lütfen bir eposta girin")
    .email("Lütfen geçerli bir eposta adresi girin"),
  password: yup
    .string()
    .required("Lütfen bir şifre girin")
    .min(8, "Şifre en az 8 elemandan oluşmalı")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Şifre en az bir harf, bir rakam ve bir özel karakter içermelidir",
    ),
  password2: yup
    .string()
    //   oneOf bir dizi değerle eşleşmeyi kontrol eder
    .oneOf([yup.ref("password")], "Şifreler eşleşmiyor")
    .required("Şifre tekrar alanı zorunludur"),
});
