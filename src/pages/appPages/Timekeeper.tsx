import { Button } from '@material-tailwind/react';
import { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';

export const TimekeeperPage = () => {

  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('timekeeper') || '{}');
    if (savedState && savedState.time) {
      const { time } = savedState;
      const oldTime = new Date(time);
      const elapSecond = oldTime.getHours() * 60 * 60 + oldTime.getMinutes() * 60 + oldTime.getSeconds()
      const offset = new Date();
      offset.setSeconds(offset.getSeconds() + elapSecond);
      reset(offset, false);
    }
  }, [reset]);


  useEffect(() => {
    if (!isRunning) return;
    const now = new Date();
    now.setHours(hours);
    now.setMinutes(minutes);
    now.setSeconds(seconds);
    const state = {
      time: now
    };
    localStorage.setItem('timekeeper', JSON.stringify(state));
  }, [hours, minutes, seconds, isRunning]);


  return (
    <div className="p-8 bg-gradient-to-l from-orange-100 to-sky-100 rounded-lg shadow-lg">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center text-primary-dark">Kronometre</h1>
      <div className="text-2xl sm:text-5xl md:text-7xl lg:text-9xl mb-8 text-center text-primary-dark font-mono font-normal">
        {formatNumber(hours)}:{formatNumber(minutes)}:
        {formatNumber(seconds)}
      </div>
      <div className="flex gap-4">
        <Button
          onClick={start}
          disabled={isRunning}
          className={`px-4 sm:px-6 sm:py-2 rounded-lg ${isRunning
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-amber-600 hover:bg-amber-700'
            } text-white font-semibold transition-all duration-500 ease-in-out border-none lg:text-xl md:text-lg sm:text-base text-sm`}
        >
          Başlat
        </Button>
        <Button
          onClick={pause}
          disabled={!isRunning}
          className={`px-4 sm:px-6 sm:py-2 rounded-lg ${!isRunning
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-red-600 hover:bg-red-700'
            } text-white font-semibold transition-all duration-500 ease-in-out border-none lg:text-xl md:text-lg sm:text-base text-sm`}
        >
          Mola
        </Button>
        <Button
          onClick={() => {
            reset(new Date(), false);
            localStorage.removeItem('timekeeper')
          }}
          className="px-4 sm:px-6 sm:py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all duration-500 ease-in-out border-none lg:text-xl md:text-lg sm:text-base text-sm"
        >
          Sıfırla
        </Button>
      </div>
    </div>
  );
};
