import {
  Button,
  ButtonGroup,
  Select,
  Switch,
  Typography,
} from "@material-tailwind/react";
import { useState, ChangeEvent } from "react";
import exams from "../../../../data/exams.json";
import { RootState } from "../../../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setStep,
  setSubject,
  setType,
} from "../../../../../features/drawer/StepperSlice";

const FirstStep = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const exam = user.exam;
  const [isCheck, setIsCheck] = useState(false);

  // Create an array of exam subjects based on the current exam type
  // const examSubjects = Object.keys(exams[isCheck ? "tyt" : "ayt"]);
  function createExamSubjectsArray() {
    //if the last 3 char is "SOZ" then json should go "ayt" and into ayt there is "soz"
    //if the last 3 char is "SAY" then json should go "ayt" and into ayt there is "say"
    //if the last 3 char is "EA" then json should go "ayt" and into ayt there is "ea"
    if (!isCheck) {
      console.log();
      if (exam.endsWith("SOZ")) {
        return Object.keys(exams.ayt.soz);
      } else if (exam.endsWith("SAY")) {
        return Object.keys(exams.ayt.say);
      } else if (exam.endsWith("EA")) {
        return Object.keys(exams.ayt.ea);
      }
      return [];
    } else {
      return Object.keys(exams.tyt);
    }
  }
  const examSubjects = createExamSubjectsArray();
  console.log(examSubjects);
  return (
    <>
      <Typography type="h4">DERS</Typography>
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
        <div className="flex flex-col w-full items-center justify-start gap-4 text-center">
          {isCheck ? (
            <>
              {/* Group of 3 and 3 and 4 */}
              <ButtonGroup
                variant="outline"
                color="secondary"
                isFullWidth
                className="border-amber-800 border-[1px] rounded-lg"
                // Problem: 'onChange' olay işleyicisini tanımlarken, 'FormEventHandler<HTMLDivElement>' türünü kullanmaya çalıştık.
                // Ancak bu tür, bir işlevin imzasını belirtir ve doğrudan parametre türü olarak kullanılamaz.
                // Çözüm: 'onChange' olay işleyicisinin parametre türünü 'React.FormEvent<HTMLDivElement>' olarak değiştirdik.
                // Bu, işlevin bir 'FormEvent<HTMLDivElement>' türünde bir olay alacağını belirtir ve tür uyumsuzluğunu çözer.
              >
                {examSubjects.map((subject, index) =>
                  index <= 2 ? (
                    <Button
                      key={index}
                      value={subject}
                      onClick={() => {
                        setTimeout(() => {
                          dispatch(setSubject(subject));
                          dispatch(setType(isCheck ? "tyt" : "ayt"));
                          dispatch(setStep(1));
                        }, 200);
                      }}
                    >
                      {subject}
                    </Button>
                  ) : null
                )}
              </ButtonGroup>
              <ButtonGroup
                variant="outline"
                color="secondary"
                isFullWidth
                className="border-indigo-800 border-[1px] rounded-lg"
              >
                {examSubjects.map((subject, index) =>
                  index > 5 && index <= 9 ? (
                    <Button
                      key={index}
                      value={subject}
                      onClick={() => {
                        setTimeout(() => {
                          dispatch(setSubject(subject));
                          dispatch(setType(isCheck ? "tyt" : "ayt"));
                          dispatch(setStep(1));
                        }, 200);
                      }}
                    >
                      {subject}
                    </Button>
                  ) : null
                )}
              </ButtonGroup>
              <ButtonGroup
                variant="outline"
                color="secondary"
                isFullWidth
                className="border-teal-800 border-[1px] rounded-lg"
              >
                {examSubjects.map((subject, index) =>
                  index > 2 && index <= 5 ? (
                    <Button
                      key={index}
                      value={subject}
                      onClick={() => {
                        setTimeout(() => {
                          dispatch(setSubject(subject));
                          dispatch(setType(isCheck ? "tyt" : "ayt"));
                          dispatch(setStep(1));
                        }, 200);
                      }}
                    >
                      {subject}
                    </Button>
                  ) : null
                )}
              </ButtonGroup>
            </>
          ) : (
            <>
              <ButtonGroup
                variant="outline"
                color="secondary"
                isFullWidth
                className="border-amber-800 border-[1px] rounded-lg"
              >
                {examSubjects.map((subject, index) =>
                  index <= 1 ? (
                    <Button
                      key={index}
                      value={subject}
                      onClick={() => {
                        setTimeout(() => {
                          dispatch(setSubject(subject));
                          dispatch(setType(isCheck ? "tyt" : "ayt"));
                          dispatch(setStep(1));
                        }, 200);
                      }}
                    >
                      {subject}
                    </Button>
                  ) : null
                )}
              </ButtonGroup>
              <ButtonGroup
                variant="outline"
                color="secondary"
                isFullWidth
                className="border-indigo-800 border-[1px] rounded-lg"
              >
                {examSubjects.map((subject, index) =>
                  index > 1 && index <= 4 ? (
                    <Button
                      key={index}
                      value={subject}
                      onClick={() => {
                        setTimeout(() => {
                          dispatch(setSubject(subject));
                          dispatch(setType(isCheck ? "tyt" : "ayt"));
                          dispatch(setStep(1));
                        }, 200);
                      }}
                    >
                      {subject}
                    </Button>
                  ) : null
                )}
              </ButtonGroup>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FirstStep;
