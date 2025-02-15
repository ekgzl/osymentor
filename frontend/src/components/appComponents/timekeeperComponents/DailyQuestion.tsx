import {
  Button,
  ButtonGroup,
  Input,
  Select,
  Switch,
} from "@material-tailwind/react";
import { useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import exams from "../../../data/exams.json";
import { RootState } from "../../../../app/store";

const DailyQuestion = () => {
  
  const user = useSelector((state: RootState) => state.user);
  const exam = user.exam;

  const [isCheck, setIsCheck] = useState(false);

  // Create an array of exam subjects based on the current exam type
  const examSubjects = Object.keys(exams[isCheck ? "tyt" : "ayt"]);

  return (
    <>
      <div className="flex flex-col gap-5 items-start justify-start">
        <div className="flex w-full gap-4 justify-start items-center">
          <p>Sınav Türü:</p>
          <Select disabled>
            <Select.Trigger
              className="w-52 text-dark bg-white"
              placeholder={exam}
            />
          </Select>
          <p>{isCheck ? "TYT" : "AYT"}</p>
          <Switch
            checked={isCheck}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setIsCheck(event.target.checked)
            }
          />
        </div>
        <div className="flex w-full items-center justify-start gap-4">
          <p>Ders:</p>
          <ButtonGroup variant="outline">
            {examSubjects.map((subject) => (
              <Button key={subject}>{subject}</Button>
            ))}
          </ButtonGroup>
        </div>
        <div className="flex w-full items-center justify-start gap-4">
          <p>Konu:</p>
        </div>

        <form
          action="#"
          className="flex w-full gap-4 justify-start items-center"
        >
          <p>Soru Sayısı:</p>
          <div className="w-52">
            <Input
              className="text-dark bg-white"
              type="number"
              min={0}
              max={1000}
              placeholder="0-1000 arası soru sayısı"
            />
          </div>
          <Button type="submit">Çöz</Button>
        </form>
      </div>
    </>
  );
};

export default DailyQuestion;
