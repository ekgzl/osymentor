import { PauseSolid, PlaySolid, Refresh } from "iconoir-react";
import { useTimer } from "react-timer-hook";
import { Tooltip, Button } from "@material-tailwind/react";

function TimerComp() {
  // beş dakiaya ayarlamak için olan date objesi
  const newDate = new Date();
  newDate.setSeconds(newDate.getSeconds() + 25 * 60);
  const { seconds, minutes, isRunning, resume, pause, restart } = useTimer({
    // Zamanlayıcının kaç saniye olsununu belirtiyoruz
    expiryTimestamp: newDate,
    autoStart: false,
  });

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="w-full h-full p-4 sm:p-8 bg-gradient-to-l from-[#212121] to-[#242526] rounded-lg shadow-lg">
      <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-4xl font-bold md:mb-8 mb-3 text-center text-amber-700">
        Zamanlayıcı
      </h1>
      <div className="text-[3.5rem] md:text-9xl lg:text-[9rem] md:mb-10 mb-6 text-center text-slate-300 font-mono font-normal">
        {formatNumber(minutes)}:{formatNumber(seconds)}
      </div>
      <div>
        <Tooltip interactive offset={6} placement="right">
          <Tooltip.Trigger
            as={Button}
            disabled={isRunning}
            className={`
              ${!isRunning ? "bg-emerald-700 hover:bg-amber-800" : "bg-gray-400 cursor-not-allowed"}
                
          cursor-pointer py-1 px-2 md:px-3 lg:px-4  lg:py-2 rounded-lg text-white font-semibold transition-all duration-500 ease-in-out border-none lg:text-xl md:text-xl sm:text-base text-sm `}
            onClick={() => {
              if (!isRunning) {
                resume();
              } else {
                return;
              }
            }}
          >
            <PlaySolid className="sm:h-[30px] sm:w-[30px] h-[20px] w-[20px] transition-transform" />
          </Tooltip.Trigger>
          <Tooltip.Content className="flex gap-3 bg-transparent  dark:bg-transparent">
            <Tooltip>
              <Tooltip.Trigger
                disabled={!isRunning}
                onClick={pause}
                as={Button}
                color="primary"
                className={`${
                  !isRunning
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-700 hover:bg-red-800"
                } py-1 px-2 md:px-3 lg:px-4 lg:py-2 rounded-lg text-white font-semibold transition-all duration-500 ease-in-out border-none lg:text-xl md:text-lg sm:text-base text-sm`}
              >
                <PauseSolid className="sm:h-[30px] sm:w-[30px] h-[20px] w-[20px] text-white" />
              </Tooltip.Trigger>
              <Tooltip.Content>
                Mola
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip>
            <Tooltip>
              <Tooltip.Trigger
                onClick={() => {
                  const newDate = new Date();
                  newDate.setSeconds(newDate.getSeconds() + 25 * 60);
                  restart(newDate, false);
                }}
                as={Button}
                color="secondary"
                className={
                  "py-1 px-2 md:px-3 lg:px-4  lg:py-2 rounded-lgtext-white font-semibold bg-sky-700 hover:bg-sky-800 transition-all duration-500 ease-in-out border-none lg:text-xl md:text-lg sm:text-base text-sm"
                }
              >
                <Refresh className="h-[28px] w-[28px] text-white" />
              </Tooltip.Trigger>
              <Tooltip.Content>
                Sıfırla
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip>
          </Tooltip.Content>
        </Tooltip>
      </div>
    </div>
  );
}

export default TimerComp;
