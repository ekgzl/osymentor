import { useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";
import { Input, Typography } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { setQuestionNumber } from "../../../../../features/drawer/StepperSlice";

function LastStep() {
  const stepper = useSelector((state: RootState) => state.stepper);
  const dispatch = useDispatch();
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(setQuestionNumber(parseInt(e.target.value)));
            }}
          />
        </div>
      </div>
    </>
  );
}

export default LastStep;
