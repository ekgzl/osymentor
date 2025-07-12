import { Select, Typography } from "@material-tailwind/react";
import { RootState } from "../../../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setTopic,
  setTopicId,
} from "../../../../../features/drawer/StepperSlice";
import { setStep } from "../../../../../features/drawer/StepperSlice";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

interface Topic {
  _id: string;
  name: string;
  subject: string;
}

export function SecondStep() {
  const dispatch = useDispatch();
  const stepper = useSelector((state: RootState) => state.stepper);
  const authToken = useSelector((state: RootState) => state.auth.token);
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/topic`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setTopics(res.data.data.topics);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    }
    fetchTopics();
  }, []);
  
  const topics_ = useMemo(() => {
    if (!Array.isArray(topics)) return [];
    return topics
      .filter((sub) => sub.subject === stepper.subjectId)
      .map((topic) => ({ name: topic.name, id: topic._id }));
  }, [topics, stepper.subjectId]);

  return (
    <>
      <Typography type="h3" className="mb-3" color="secondary">
        KONU
      </Typography>
      <div className="flex items-center text-start justify-between">
        <p className="text-slate-200">
          Ders: <span className="uppercase">{stepper.type}</span>{" "}
          {stepper.subject}
        </p>
        <Select
          onValueChange={(value: string) => {
            const parsed = JSON.parse(value);
            dispatch(setTopic(parsed.name));
            dispatch(setStep(2));
            dispatch(setTopicId(parsed.id));
          }}
        >
          <Select.Trigger
            className="w-72 mt-1 border-slate-200 hover:border-amber-400 focus:border-amber-500 data-[open=true]:border-amber-500
            ring-0 [&_[data-slot=placeholder]]:text-slate-200
            "
            placeholder="Konu Seç"
          />
          <Select.List className="overflow-y-scroll">
            {/*  Problem: TypeScript, "Bu ifade çağrılabilir değil. 'string[] | (<U>(callbackfn: (value: string, index: number, array: string[]) => U, thisArg?: any) => U[])' türünün tüm bileşenleri çağrılabilir değil." hatasını verdi.
 Bu hata, 'topics' değişkeninin, .map() metodunu çağırmadan önce bir dizi (array) olup olmadığının garanti edilmemesinden kaynaklandı.
 Çözüm: 'topics' değişkeninin bir dizi olduğunu kontrol etmek için Array.isArray(topics) fonksiyonunu ekledik.
Eğer 'topics' bir dizi değilse, mevcut konuların olmadığını belirten bir yedek seçenek gösteriyoruz. */}
            {topics_.map((topic: { name: string; id: string }) => (
              <Select.Option
                key={topic.id}
                value={JSON.stringify({ name: topic.name, id: topic.id })}
              >
                {topic.name}
              </Select.Option>
            ))}
          </Select.List>
        </Select>
      </div>
    </>
  );
}
