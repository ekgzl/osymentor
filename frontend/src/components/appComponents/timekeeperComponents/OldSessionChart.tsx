"use client";

// @components
import { Card } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import {
  XAxis,
  Legend,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
  Rectangle,
} from "recharts";
import { RootState } from "../../../../app/store";

//1236
const sessionSumbyDay = (sessions: any) => {
  const sumSessions: number[] = [0, 0, 0, 0, 0, 0, 0];
  if (!sessions || !sessions.length) {
    return sumSessions;
  }
  for (let i = 0; i < sessions.length; i++) {
    const { time } = sessions[i];
    const tempSession = new Date(time);
    const hours = tempSession.getHours();
    const minutes = tempSession.getMinutes();
    const seconds = tempSession.getSeconds();
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    switch (tempSession.getDay()) {
      case 0:
        sumSessions[0] += totalSeconds;
        break;
      case 1:
        sumSessions[1] += totalSeconds;
        break;
      case 2:
        sumSessions[2] += totalSeconds;
        break;
      case 3:
        sumSessions[3] += totalSeconds;
        break;
      case 4:
        sumSessions[4] += totalSeconds;
        break;
      case 5:
        sumSessions[5] += totalSeconds;
        break;
      case 6:
        sumSessions[6] += totalSeconds;
        break;
    }
  }
  return sumSessions;
};

const getDayName = (date: Date): string => {
  //JS'te 0'dan başlar
  const days = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];
  return days[date.getDay()];
};

// sağ üst köşede görünen legend için
function renderLegendText(value: string) {
  return (
    <span className="text-sm text-foreground capitalize ml-0.5 select-none">
      {value}
    </span>
  );
}

// üstüne gelince görünen tooltip
function CustomTooltip({
  active,
  payload,
  label,
}: {
  active: boolean;
  payload: any;
  label: string;
}) {
  if (active && payload && payload.length) {
    return (
      <Card className="rounded-lg items-center text-sm pl-2 py-2 pr-3 flex gap-2">
        <div className="flex flex-col">
          <div className="w-1.5 rounded-full shrink-0 h-10 block bg-amber-500" />
          <div className="w-1.5 rounded-full shrink-0 h-10 block bg-purple-400" />
        </div>

        <div>
          <p className="text-foreground mb-0.5">{payload[1].name}</p>
          <p className="text-amber-600">{`${label} : ${payload[1].value > 3600 ? `${Math.floor(payload[1].value / 3600)} s. ${Math.floor((payload[1].value % 3600) / 60)} dk. ` : `${Math.floor(payload[1].value / 60)} dk. ${payload[1].value % 60} s.`}`}</p>
          <p className="text-foreground mb-0.5">{payload[0].name}</p>
          <p className="text-purple-400">{`${label} : ${payload[0].value > 3600 ? `${Math.floor(payload[0].value / 3600)} s. ${Math.floor((payload[0].value % 3600) / 60)} dk. ` : `${Math.floor(payload[0].value / 60)} dk. ${payload[0].value % 60} s.`}`}</p>
        </div>
      </Card>
    );
  }

  return null;
}

export default function OldSessionChartComp() {
  const sessions = useSelector((state: RootState) => state.sessions.sessions);
  const chartArray = sessionSumbyDay(sessions);
  console.log(chartArray);
  // 7 günlük veri oluşturan bir dizi (array) oluşturur
  // Her bir gün için bugünden geriye doğru giderek veri hazırlar
  const CHART_DATA = Array.from({ length: 7 }, (_, index) => {
    // Yeni bir tarih nesnesi oluşturur
    const date = new Date();
    // Bugünden geriye doğru giderek tarihi ayarlar (6'dan geriye doğru)
    date.setDate(date.getDate() - (6 - index));

    // Her gün için bir veri objesi döndürür
    return {
      day: getDayName(date), // Günün adını alır
      "Bu Hafta": chartArray[date.getDay()], // Bu haftanın verisini alır
      "Geçen Hafta": 0, // Geçen haftanın verisi (şimdilik 0)
    };
  });
  console.log(CHART_DATA);
  return (
    <Card className="shadow-none border-none bg-transparent">
      <Card.Body className="p-6 relative">
        <div className="h-96 md:h-[32rem]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={CHART_DATA}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis
                dataKey={"Bu Hafta"}
                ticks={[0, 3600, 7200, 10800, 14400, 18000, 21600, 25200]} // 1'er saatlik aralıklar
                tickFormatter={(value) => {
                  const hours = Math.floor(value / 3600);
                  return `${hours} saat`;
                }}
              />
              <Tooltip
                cursor={<Rectangle />}
                content={
                  <CustomTooltip active={true} payload={[]} label={""} />
                }
              />
              <Legend
                height={40}
                iconSize={10}
                align="right"
                iconType="circle"
                verticalAlign="top"
                formatter={renderLegendText}
              />
              <Bar dataKey="Geçen Hafta" fill="#8884d8" />
              <Bar dataKey="Bu Hafta" fill="#e69d30" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  );
}
