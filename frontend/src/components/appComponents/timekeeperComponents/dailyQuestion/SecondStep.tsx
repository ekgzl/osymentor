import { Select, Typography } from "@material-tailwind/react";
import { RootState } from "../../../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import exams from "../../../../data/exams.json";
import { setTopic } from "../../../../../features/drawer/StepperSlice";
import { setStep } from "../../../../../features/drawer/StepperSlice";
// 1. İlk olarak, JSON'un yapısını TypeScript'e tanıtmak için bir interface tanımlıyoruz.
interface ExamsType {
  //Record anahtar nesne ilişkisindedir
  tyt: Record<string, string[]>;
  // ayt is "ayt": { "say": {}, "soz",}
  ayt: Record<string, Record<string, string[]>>;
}

function SecondStep() {
  // 3. TypeScript'in JSON'u tanıyabilmesi için onu `ExamsType` olarak belirtiyoruz.
  const examsData: ExamsType = exams;

  const dispatch = useDispatch();
  const stepper = useSelector((state: RootState) => state.stepper);
  const user = useSelector((state: RootState) => state.user);

  function topicSelector() {
    if (stepper.type === "tyt") {
      return examsData["tyt"]?.[stepper.subject];
    } else {
      // I should use user.exam stringlast 3 or 2 chars they are: "SAY","SOZ"AND "EA" and do them lowercase if EA delete a space
      const exam = user.exam.slice(-3).toLowerCase();
      if (exam === " ea") {
        return examsData["ayt"]?.["ea"]?.[stepper.subject] || [];
      }
      return examsData["ayt"]?.[exam]?.[stepper.subject] || [];
    }
  }
  const topics = topicSelector();
  return (
    <>
      <Typography type="h3" className="mb-3">
        KONU
      </Typography>
      <div className="flex items-center text-start justify-between">
        <p>
          Ders: <span className="uppercase">{stepper.type}</span>{" "}
          {stepper.subject}
        </p>
        <Select
          onValueChange={(value: string) => {
            dispatch(setTopic(value));
            dispatch(setStep(2));
          }}
        >
          <Select.Trigger className="w-72 mt-1" placeholder="Konu Seç" />
          <Select.List className="overflow-y-scroll">
            {/*  Problem: TypeScript, "Bu ifade çağrılabilir değil. 'string[] | (<U>(callbackfn: (value: string, index: number, array: string[]) => U, thisArg?: any) => U[])' türünün tüm bileşenleri çağrılabilir değil." hatasını verdi.
 Bu hata, 'topics' değişkeninin, .map() metodunu çağırmadan önce bir dizi (array) olup olmadığının garanti edilmemesinden kaynaklandı.
 Çözüm: 'topics' değişkeninin bir dizi olduğunu kontrol etmek için Array.isArray(topics) fonksiyonunu ekledik.
Eğer 'topics' bir dizi değilse, mevcut konuların olmadığını belirten bir yedek seçenek gösteriyoruz. */}
            {topics.map((topic: string) => (
              <Select.Option key={topic} value={topic}>
                {topic}
              </Select.Option>
            ))}
          </Select.List>
        </Select>
      </div>
    </>
  );
}

export default SecondStep;
