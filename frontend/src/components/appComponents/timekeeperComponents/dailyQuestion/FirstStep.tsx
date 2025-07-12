import {
  Button,
  ButtonGroup,
  List,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";

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
  const authToken = useSelector((state: RootState) => state.auth.token);
  const [isCheck, setIsCheck] = useState(false);
  const [selected, setSelected] = useState("tyt");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  //GET ALL SUBJECTS FROM API
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/subject`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
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
      <div className="flex flex-col gap-5 items-start justify-start">
        <Typography type="h4" color="secondary">
          DERS
        </Typography>
        <div className="flex w-full gap-4 justify-start items-center text-slate-100">
          <p>Sınav Türü:</p>
          <div className="cursor-not-allowed">
            <Select disabled>
              <Select.Trigger
                className="w-52 text-gray-400 bg-[#090909] "
                placeholder={exam}
              />
            </Select>
          </div>
          <List className="flex flex-row ">
            <List.Item
              className="cursor-pointer hover:text-orange-500 secondary   text-slate-100 border-2 border-slate-500"
              selected={selected === "tyt"}
              onClick={() => {
                setSelected("tyt");
                setIsCheck(true);
              }}
            >
              TYT
            </List.Item>
            <List.Item
              className="cursor-pointer hover:text-orange-500 secondary text-slate-100 border-2 border-slate-500 "
              selected={selected === "ayt"}
              onClick={() => {
                setSelected("ayt");
                setIsCheck(false);
              }}
            >
              AYT
            </List.Item>
          </List>
        </div>
        <div className="flex flex-col w-full items-center justify-start gap-4 text-center">
          {isCheck ? (
            <>
              {/* Group of 3 and 3 and 4 */}
              <ButtonGroup
                variant="outline"
                color="secondary"
                isFullWidth
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
                      className="border-amber-600 border-[1px] rounded-lg hover:bg-[#404040] text-slate-200"
                    >
                      {subject.name}
                    </Button>
                  ) : null
                )}
              </ButtonGroup>
              <ButtonGroup variant="outline" color="secondary" isFullWidth>
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
                      className="border-indigo-500 border-[1px] rounded-lg hover:bg-[#404040] text-slate-200"
                    >
                      {subject.name}
                    </Button>
                  ) : null
                )}
              </ButtonGroup>
              <ButtonGroup variant="outline" color="secondary" isFullWidth>
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
                      className="border-sky-500 border-[1px] rounded-lg hover:bg-[#404040] text-slate-200"
                    >
                      {subject.name}
                    </Button>
                  ) : null
                )}
              </ButtonGroup>
            </>
          ) : (
            <>
              <ButtonGroup variant="outline" color="secondary" isFullWidth>
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
                      className="border-amber-600 border-[1px] rounded-lg hover:bg-[#404040] text-slate-200"
                    >
                      {subject.name}
                    </Button>
                  ) : null
                )}
              </ButtonGroup>
              <ButtonGroup variant="outline" color="secondary" isFullWidth>
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
                      className="border-sky-500 border-[1px] rounded-lg hover:bg-[#404040] text-slate-200"
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
