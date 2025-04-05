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
  ComposedChart,
  Line,
} from "recharts";
import { RootState } from "../../../../app/store";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

interface Session {
  date: string;
  totalDuration: number;
  totalSolved: number;
}

const getDayName = (date: Date): string => {
  return date.toLocaleDateString("tr-TR", { weekday: "short" });
};

// sağ üst köşede görünen legend için
function renderLegendText(value: string) {
  return (
    <span className="text-sm  capitalize ml-0.5 select-none text-white">
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
      <Card className="rounded-lg items-center text-sm pl-2 py-2 pr-3 flex gap-2 bg-[#404040]">
        <div className="flex flex-col">
          <div className="w-1.5 rounded-full shrink-0 h-10 block bg-[#7c86ff]" />
          <div className="w-1.5 rounded-full shrink-0 h-10 block bg-[#bedbff]" />
        </div>

        <div>
          <p className="text-slate-200 mb-0.5">{payload[1].name}</p>
          <p className="text-[#7c86ff]">{`${label} : ${payload[1].value > 3600 ? `${Math.floor(payload[1].value / 3600)} s. ${Math.floor((payload[1].value % 3600) / 60)} dk. ` : `${Math.floor(payload[1].value / 60)} dk. ${payload[1].value % 60} s.`}`}</p>
          <p className="text-slate-200 mb-0.5">{payload[0].name}</p>
          <p className="text-[#bedbff]">{`${label} : ${payload[0].value > 3600 ? `${Math.floor(payload[0].value / 3600)} s. ${Math.floor((payload[0].value % 3600) / 60)} dk. ` : `${Math.floor(payload[0].value / 60)} dk. ${payload[0].value % 60} s.`}`}</p>
        </div>
      </Card>
    );
  }

  return null;
}

export default function OldSessionChartComp() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const user = useSelector((state: RootState) => state.user._id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: { sessions: Session[] } }>(
          `${import.meta.env.VITE_API_URL}/api/v1/session/duration-chart/${user}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        setSessions(
          response.data.data.sessions.map((session) => ({
            date: session.date,
            totalDuration: session.totalDuration,
            totalSolved: session.totalSolved,
          }))
        );
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };
    fetchData();
  }, []);

  // 7 günlük veri oluşturan bir dizi (array) oluşturur
  // Her bir gün için bugünden geriye doğru giderek veri hazırlar
  const CHART_DATA = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 7 }, (_, index) => {
      const currentDate = new Date(now);
      currentDate.setDate(currentDate.getDate() - (6 - index));

      //BU HAFTA
      const weekStart = new Date(currentDate);
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(currentDate);
      weekEnd.setHours(23, 59, 59, 999);

      //GEÇEN HAFTA
      const lastWeekStart = new Date(weekStart);
      lastWeekStart.setDate(lastWeekStart.getDate() - 7);
      const lastWeekEnd = new Date(weekEnd);
      lastWeekEnd.setDate(lastWeekEnd.getDate() - 7);

      // filter data by date with duration and solved question
      const currentWeekData = sessions
        .filter((session) => {
          const sessionDate = new Date(session.date);
          return sessionDate >= weekStart && sessionDate <= weekEnd;
        })
        .map((session) => ({
          date: session.date,
          totalDuration: session.totalDuration,
          totalSolved: session.totalSolved,
        }));

      const lastWeekData = sessions
        .filter((session) => {
          const sessionDate = new Date(session.date);
          return sessionDate >= lastWeekStart && sessionDate <= lastWeekEnd;
        })
        .map((session) => ({
          date: session.date,
          totalDuration: session.totalDuration,
          totalSolved: session.totalSolved,
        }));
      return {
        day: getDayName(currentDate),
        "Bu Hafta Süre": currentWeekData.reduce(
          (sum, s) => sum + s.totalDuration,
          0
        ),
        "Geçen Hafta Süre": lastWeekData.reduce(
          (sum, s) => sum + s.totalDuration,
          0
        ),
        "Bu Hafta Çözülen": currentWeekData.reduce(
          (sum, s) => sum + s.totalSolved,
          0
        ),
        "Geçen Hafta Çözülen": lastWeekData.reduce(
          (sum, s) => sum + s.totalSolved,
          0
        ),
      };
    });
  }, [sessions]);

  return (
    <Card className="shadow-none border-none bg-transparent">
      <Card.Body className="p-6 relative">
        <div className="h-96 md:h-[32rem]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              width={300}
              height={100}
              data={CHART_DATA}
              margin={{
                top: 5,
                right: 35,
                left: 25,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.1)"
              />
              <XAxis dataKey="day" stroke="oklch(87.1% 0.006 286.286)" />
              <YAxis
                dataKey={"Bu Hafta Süre"}
                ticks={[0, 3600, 7200, 10800, 14400, 18000, 21600, 25200]} // 1'er saatlik aralıklar
                tickFormatter={(value) => {
                  const hours = Math.floor(value / 3600);
                  return `${hours} saat`;
                }}
                stroke="oklch(87.1% 0.006 286.286)"
                yAxisId={"left"}
              />
              <YAxis
                dataKey={"Bu Hafta Çözülen"}
                stroke="oklch(87.1% 0.006 286.286)"
                yAxisId={"right"}
                orientation="right"
                tickFormatter={(value) => {
                  return `${value} soru`;
                }}
              />
              <Tooltip
                cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
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
              <Bar
                dataKey="Geçen Hafta Süre"
                fill="oklch(88.2% 0.059 254.128)"
                yAxisId="left"
              />
              <Bar
                dataKey="Bu Hafta Süre"
                fill="oklch(67.3% 0.182 276.935)"
                yAxisId="left"
              />
              {/* Çözülen Soru Çizgileri */}
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="Bu Hafta Çözülen"
                stroke="oklch(70.2% 0.183 293.541)"
                strokeWidth={2}
                name="Bu Hafta Çöz."
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="Geçen Hafta Çözülen"
                stroke="oklch(89.4% 0.057 293.283)"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Geçen Hafta Çöz."
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  );
}
