import { useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";
import { Input, Typography } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { setQuestionNumber } from "../../../../../features/drawer/StepperSlice";
import { QuestionSchema } from "../../../../formikSchemas/QuestionSchema";
import { useFormik } from "formik";
function LastStep() {
  const stepper = useSelector((state: RootState) => state.stepper);
  const dispatch = useDispatch();

  const { values, errors, handleChange, touched, handleBlur } = useFormik({
    initialValues: {
      count: 0,
    },
    validationSchema: QuestionSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      dispatch(setQuestionNumber(values.count));
    },
  });

  return (
    <>
      <Typography type="h3">SORU</Typography>
      <div className="flex justify-between items-center w-full text-start">
        <div>
          <p>
            Ders: <span className="uppercase">{stepper.type}</span>{" "}
            {stepper.subject}
          </p>
        </div>

        <p>Konu: {stepper.topic}</p>
        <div>
          <Input
            size="sm"
            className="w-72 text-dark bg-white"
            type="number"
            min={0}
            max={1000}
            placeholder="Soru Sayısı"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.count}
            id="count"
            name="count"
          />
          {errors.count && touched.count && (
            <p className={"text-red-700 text-xs "}>{errors.count}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default LastStep;
