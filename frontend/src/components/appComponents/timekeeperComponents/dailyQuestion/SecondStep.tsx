import { Select, Typography } from "@material-tailwind/react";
import { RootState } from "../../../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { setTopic } from "../../../../../features/drawer/StepperSlice";
import { setStep } from "../../../../../features/drawer/StepperSlice";
import axios from "axios";
import { useEffect, useState } from "react";

interface Topic {
  _id: string;
  name: string;
  subject: string;
}

export function SecondStep() {
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/v1/topic`).then((res) => {
      setTopics(res.data.data.topics);
    });
  }, []);

  const dispatch = useDispatch();
  const stepper = useSelector((state: RootState) => state.stepper);
  const [topics, setTopics] = useState<Topic[]>([]);

  function topicSelector() {
    return topics
      .filter((sub) => sub.subject === stepper.subjectId)
      .map((topic) => ({ name: topic.name, id: topic._id }));
  }
  const topics_ = topicSelector();

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
            {topics_.map((topic: { name: string; id: string }) => (
              <Select.Option key={topic.id} value={topic.name}>
                {topic.name}
              </Select.Option>
            ))}
          </Select.List>
        </Select>
      </div>
    </>
  );
}
