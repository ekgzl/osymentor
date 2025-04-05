"use client";

import OldSessionChartComp from "../../components/appComponents/timekeeperComponents/OldSessionChart";
import ChronometerComp from "../../components/appComponents/timekeeperComponents/Chronometer";
import TimerComp from "../../components/appComponents/timekeeperComponents/Timer";

export const TimekeeperPage = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full flex gap-5 items-center justify-between h-full flex-wrap bt:flex-nowrap">
        <div className="bt:basis-[70%] w-full">
          <ChronometerComp />
        </div>
        <div className="bt:basis-[30%] h-full w-full">
          <TimerComp />
        </div>
      </div>
      <div className="w-full p-4 sm:p-8 bg-gradient-to-l from-[#212121] to-[#242526] rounded-lg shadow-lg mt-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center text-amber-700">
          Çalışma Geçmişi
        </h1>
        <div className="mt-4">
          <OldSessionChartComp />
        </div>
      </div>
    </div>
  );
};
