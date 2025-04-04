import {
  Button,
  ButtonGroup,
  Select,
  Switch,
  Typography,
} from "@material-tailwind/react";
import { useState, ChangeEvent, useEffect } from "react";

import { RootState } from "../../../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setStep,
  setSubject,
  setType,
  setSubjectId,
} from "../../../../../features/drawer/StepperSlice";

import axios from "axios";

interface Subject {
  _id: string;
  name: string;
  examType: string;
  // add other properties that your subjects have
}

const FirstStep = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const exam = user.exam;
  const [isCheck, setIsCheck] = useState(false);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  //GET ALL SUBJECTS FROM API
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/v1/subject`).then((res) => {
      setSubjects(res.data.data.subjects);
    });
  }, []);

  // Create an array of exam subjects based on the current exam type
  // const examSubjects = Object.keys(exams[isCheck ? "tyt" : "ayt"]);
  function createExamSubjectsArray() {
    // Add a check to ensure subjects is an array
    if (!Array.isArray(subjects)) {
      console.error("Subjects is not an array:", subjects);
      return [];
    }

    if (!isCheck) {
      if (exam.endsWith("SOZ")) {
        return subjects
          .filter((sub) => sub.examType === "AYT-EA")
          .map((sub) => ({ name: sub.name, id: sub._id }));
      } else if (exam.endsWith("SAY")) {
        return subjects
          .filter((sub) => sub.examType === "AYT-SAY")
          .map((sub) => ({ name: sub.name, id: sub._id }));
      } else if (exam.endsWith("EA")) {
        return subjects
          .filter((sub) => sub.examType === "AYT-EA")
          .map((sub) => ({ name: sub.name, id: sub._id }));
      }
    } else {
      return subjects
        .filter((sub) => sub.examType === "TYT")
        .map((sub) => ({ name: sub.name, id: sub._id }));
    }
    return [];
  }

  const examSubjects = createExamSubjectsArray();
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
                      value={subject.name}
                      onClick={() => {
                        setTimeout(() => {
                          dispatch(setSubject(subject.name));
                          dispatch(setType(isCheck ? "tyt" : "ayt"));
                          dispatch(setStep(1));
                          dispatch(setSubjectId(subject.id));
                        }, 200);
                      }}
                    >
                      {subject.name}
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
                      value={subject.name}
                      onClick={() => {
                        setTimeout(() => {
                          dispatch(setSubject(subject.name));
                          dispatch(setType(isCheck ? "tyt" : "ayt"));
                          dispatch(setStep(1));
                          dispatch(setSubjectId(subject.id));
                        }, 200);
                      }}
                    >
                      {subject.name}
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
                      value={subject.name}
                      onClick={() => {
                        setTimeout(() => {
                          dispatch(setSubject(subject.name));
                          dispatch(setType(isCheck ? "tyt" : "ayt"));
                          dispatch(setStep(1));
                          dispatch(setSubjectId(subject.id));
                        }, 200);
                      }}
                    >
                      {subject.name}
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
                      value={subject.name}
                      onClick={() => {
                        setTimeout(() => {
                          dispatch(setSubject(subject.name));
                          dispatch(setType(isCheck ? "tyt" : "ayt"));
                          dispatch(setStep(1));
                          dispatch(setSubjectId(subject.id));
                        }, 200);
                      }}
                    >
                      {subject.name}
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
                      value={subject.name}
                      onClick={() => {
                        setTimeout(() => {
                          dispatch(setSubject(subject.name));
                          dispatch(setType(isCheck ? "tyt" : "ayt"));
                          dispatch(setStep(1));
                          dispatch(setSubjectId(subject.id));
                        }, 200);
                      }}
                    >
                      {subject.name}
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
