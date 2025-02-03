"use client";

import OldSessionChartComp from "../../components/appComponents/timekeeperComponents/OldSessionChart";
import ChronometerComp from "../../components/appComponents/timekeeperComponents/Chronometer";

export const TimekeeperPage = () => {
  return (
    <>
      <ChronometerComp />
      <div className="p-4 sm:p-8 bg-gradient-to-l from-orange-100 to-sky-100 rounded-lg shadow-lg mt-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center text-primary-dark">
          Çalışma Geçmişi
        </h1>
        <div className="mt-4">
          <OldSessionChartComp />
        </div>
      </div>
    </>
  );
};
