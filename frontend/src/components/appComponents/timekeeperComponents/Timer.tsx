import { PauseSolid, PlaySolid, Refresh } from "iconoir-react";
import { useTimer } from "react-timer-hook";
import { Tooltip, Button } from "@material-tailwind/react";

function TimerComp() {
  // beş dakiaya ayarlamak için olan date objesi
  const newDate = new Date();
  newDate.setSeconds(newDate.getSeconds() + 25 * 60);
  const { seconds, minutes, isRunning, start, pause, restart } = useTimer({
    // Zamanlayıcının kaç saniye olsununu belirtiyoruz
    expiryTimestamp: newDate,
    autoStart: false,
  });

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="w-full h-full p-4 sm:p-8 bg-gradient-to-l from-orange-50 to-sky-100 rounded-lg shadow-lg">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center text-primary-dark">
        Zamanlayıcı
      </h1>
      <div className="text-[3.5rem] md:text-9xl lg:text-[9rem] mb-10 text-center text-primary-dark font-mono font-normal">
        {formatNumber(minutes)}:{formatNumber(seconds)}
      </div>
      <div>
        <Tooltip interactive offset={6} placement="right">
          <Tooltip.Trigger
            as={Button}
            disabled={isRunning}
            className={`${
              isRunning
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-700"
            } cursor-pointer py-1 px-2 md:px-3 lg:px-4  lg:py-2 rounded-lg text-white font-semibold transition-all duration-500 ease-in-out border-none lg:text-xl md:text-lg sm:text-base text-sm `}
            onClick={start}
          >
            <PlaySolid className=" h-[32px] w-[32px] transition-transform" />
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
                    : "bg-red-600 hover:bg-red-700"
                } py-1 px-2 md:px-3 lg:px-4 lg:py-2 rounded-lg text-white font-semibold transition-all duration-500 ease-in-out border-none lg:text-xl md:text-lg sm:text-base text-sm`}
              >
                <PauseSolid className="h-[32px] w-[32px] text-white" />
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
                  "py-1 px-2 md:px-3 lg:px-4  lg:py-2 rounded-lgtext-white font-semibold bg-blue-500 hover:bg-blue-600 transition-all duration-500 ease-in-out border-none lg:text-xl md:text-lg sm:text-base text-sm"
                }
              >
                <Refresh className="h-[32px] w-[32px] text-white" />
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
