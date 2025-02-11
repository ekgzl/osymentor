import { Button, ButtonGroup, Switch } from "@material-tailwind/react";
import { useState, ChangeEvent } from "react";
import { store } from "../../../../app/store";
import exams from "../../../data/exams.json";

const DailyQuestion = () => {
  const [isCheck, setIsCheck] = useState(false);

  // Create an array of exam subjects based on the current exam type
  const examSubjects = Object.keys(exams[isCheck ? "tyt" : "ayt"]);

  return (
    <>
      <div className="flex gap-4 p-4 items-center">
        <p>{isCheck ? "TYT" : "AYT"}</p>
        <Switch
          checked={isCheck}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setIsCheck(event.target.checked)
          }
        />
        <div className="flex w-full flex-col gap-4">
          <ButtonGroup variant="outline">
            {examSubjects.map((subject) => (
              <Button key={subject}>{subject}</Button>
            ))}
          </ButtonGroup>
        </div>
      </div>
    </>
  );
};

export default DailyQuestion;
