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
      <Typography type="h3" color="secondary">
        SORU
      </Typography>
      <div className="flex justify-between items-center w-full text-start">
        <div>
          <p className="text-slate-100">
            Ders: <span className="uppercase">{stepper.type}</span>{" "}
            {stepper.subject}
          </p>
        </div>

        <p className="text-slate-100">Konu: {stepper.topic}</p>
        <div className="flex flex-row items-center gap-3">
          <p className="text-slate-100 whitespace-nowrap">Soru Sayısı:</p>
          <Input
            size="sm"
            className="w-72 text-slate-100 bg-[#1D1D1D] hover:border-amber-500 focus:border-amber-600 "
            type="number"
            min={0}
            max={1000}
            placeholder="Soru Sayısı"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
              dispatch(setQuestionNumber(parseInt(e.target.value)));
            }}
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
