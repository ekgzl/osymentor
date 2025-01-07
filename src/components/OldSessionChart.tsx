"use client";

// @components
import { Card } from "@material-tailwind/react";
import {
    Line,
    XAxis,
    Legend,
    Tooltip,
    LineChart,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const sessions = JSON.parse(localStorage.getItem('sessions') || '{"sessions": []}');

const sessionSumbyDay = (sessions: any) => {
    const sumSessions: number[] = [0, 0, 0, 0, 0, 0, 0]
    for (let i = 0; i < sessions.sessions.length; i++) {
        const tempSession = new Date(sessions.sessions[i].time)
        const hours = tempSession.getHours()
        const minutes = tempSession.getMinutes()
        const seconds = tempSession.getSeconds()
        const totalSeconds = hours * 3600 + minutes * 60 + seconds

        switch (tempSession.getDay()) {
            case 0:
                sumSessions[0] += totalSeconds
                break;
            case 1:
                sumSessions[1] += totalSeconds
                break;
            case 2:
                sumSessions[2] += totalSeconds
                break;
            case 3:
                sumSessions[3] += totalSeconds
                break;
            case 4:
                sumSessions[4] += totalSeconds
                break;
            case 5:
                sumSessions[5] += totalSeconds
                break;
            case 6:
                sumSessions[6] += totalSeconds
                break;
        }

    }
    return sumSessions
}

const getDayName = (date: Date): string => {
    //JS'te 0'dan başlar
    const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    return days[date.getDay()];
};

const chartArray = sessionSumbyDay(sessions)

const CHART_DATA = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));

    return {
        day: getDayName(date),
        "Bu Hafta": chartArray[date.getDay()],
        "Geçen Hafta": 0,
    };
});

// sağ üst köşede görünen legend için
function renderLegendText(value: string) {
    return (
        <span className="text-sm text-foreground capitalize ml-0.5 select-none">
            {value}
        </span>
    );
}

// üstüne gelince görünen tooltip
function CustomTooltip({ active, payload, label }: { active: boolean, payload: any, label: string }) {
    if (active && payload && payload.length) {
        return (
            <Card className="rounded-lg items-center text-sm pl-2 py-2 pr-3 flex gap-2">
                <div className="w-1.5 rounded-full shrink-0 h-10 block bg-amber-500" />
                <div>
                    <p className="text-foreground mb-0.5">{payload[0].name}</p>
                    <p className="capitalize text-amber-600">{`${label} : ${payload[0].value > 3600 ? `${Math.floor(payload[0].value / 3600)} s. ${Math.floor(payload[0].value % 3600 / 60)} dk. ` : `${Math.floor(payload[0].value / 60)} dk. ${payload[0].value % 60} s.`}`}</p>
                </div>
            </Card>
        );
    }

    return null;
}

export default function Chart6() {
    return (
        <Card className="shadow-none border-none bg-transparent">
            <Card.Body className="p-6 relative">
                <div className="h-96 md:h-[32rem]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            accessibilityLayer
                            className="[&_svg]:outline-none"
                            data={CHART_DATA}
                        >
                            <CartesianGrid
                                vertical={false}
                                strokeDasharray="10"
                                stroke="rgb(var(--color-surface))"
                            />
                            <Tooltip
                                cursor={false}
                                content={
                                    <CustomTooltip
                                        label={""}
                                        active={false}
                                        payload={[]}
                                    />
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
                            {/* x eksendeki yazıların görünümü */}
                            <XAxis
                                dataKey="day"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                className="text-xs text-foreground"
                            />
                            <Line
                                dot={false}
                                type="natural"
                                strokeWidth={3}
                                dataKey="Bu Hafta"
                                stroke="rgb(var(--color-warning))"
                            />
                            <Line
                                dot={false}
                                type="natural"
                                strokeWidth={3}
                                dataKey="Geçen Hafta"
                                stroke="rgb(var(--color-info))"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card.Body>
        </Card>

    );
}