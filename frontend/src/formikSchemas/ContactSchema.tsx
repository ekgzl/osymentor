import * as yup from "yup";

export const ContactSchema = yup.object().shape({
    topic: yup.string(),
    name: yup.string().required("Lütfen bir isim girin"),
    surname: yup.string(),
    email: yup
        .string()
        .required("Lütfen bir eposta girin")
        .email("Lütfen geçerli bir eposta adresi girin"),
    message: yup
        .string()
        .required("Lütfen bir mesaj girin")
        .min(10, "Lütfen en az 10 karakterlik bir mesaj girin"),
});
