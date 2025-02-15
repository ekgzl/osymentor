import { Select, Typography } from "@material-tailwind/react";
import { RootState } from "../../../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import exams from "../../../../data/exams.json";



function SecondStep() {
  const dispatch = useDispatch();
  const stepper = useSelector((state: RootState) => state.stepper);
  const topics = Object.values(exams[stepper.type][stepper.subject]);
  console.log(topics);
  return (
    <div>
      <Typography type="h3" className="mb-3">
        KONU
      </Typography>
      <p>Ders: {stepper.subject}</p>
      <p>
        Tür: <span className="uppercase">{stepper.type}</span>
      </p>
      <Select>
        <Select.Trigger className="w-72 mt-1" placeholder="Konu Seç" />
        <Select.List>
          {topics.map((topic: string) => (
            <Select.Option key={topic}>{topic}</Select.Option>
          ))}
        </Select.List>
      </Select>
    </div>
  );
}

export default SecondStep;
