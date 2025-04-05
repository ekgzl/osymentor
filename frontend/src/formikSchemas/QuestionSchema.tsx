import * as yup from "yup";
export const QuestionSchema = yup.object().shape({
  count: yup
    .number()
    .min(0, "Soru sayısı 0'dan büyük olmalıdır")
    .max(500, "Soru sayısı 500'den az olmalıdır"),
});
