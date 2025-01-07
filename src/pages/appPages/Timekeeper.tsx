"use client";

import { Button } from '@material-tailwind/react';
import { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import OldSessionChart from '../../components/OldSessionChart';

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

  //kronometre değiştiğinde localStorage'dan zamanı alıyoruz
  useEffect(() => {
    // localStorage'dan 'timekeeper' anahtarıyla kaydedilmiş veriyi almayı deniyoruz.
    // Eğer böyle bir veri yoksa, varsayılan olarak boş bir obje ({}) kullanıyoruz.
    const savedState = JSON.parse(localStorage.getItem('timekeeper') || '{}');
    if (savedState && savedState.time) {

      const { time } = savedState;

      const oldTime = new Date(time);
      // Kaydedilmiş zamandaki saat, dakika ve saniyeleri hesaplayarak toplam saniye cinsinden bir değer elde ediyoruz.
      const elapSecond = oldTime.getHours() * 60 * 60 + oldTime.getMinutes() * 60 + oldTime.getSeconds()

      const offset = new Date();
      // Şu anki zamana, kaydedilmiş zamandan elde ettiğimiz toplam saniye değerini ekleyerek yeni bir zaman belirliyoruz.
      offset.setSeconds(offset.getSeconds() + elapSecond);
      reset(offset, false);
    }
    // Bu useEffect'in bağımlılık dizisi [reset] olarak belirtilmiş. Bu, sadece 'reset' fonksiyonu değiştiğinde((prop'ları veya state'i değiştiğinde)) bu useEffect'in tekrar çalışacağı anlamına gelir.
  }, [reset]);

  //kronometre değiştiğinde localStorage'a kaydediyoruz
  useEffect(() => {
    if (!isRunning) return;
    const now = new Date(); // şu anki zamanı alıyoruz
    now.setHours(hours);
    now.setMinutes(minutes);
    now.setSeconds(seconds);
    const state = {
      time: now
    };
    localStorage.setItem('timekeeper', JSON.stringify(state));
  }, [hours, minutes, seconds, isRunning]);

  //çalışmayı bitirdiğimizde localStorage'a kaydediyoruz
  const handleWorkEnd = () => {
    const now = new Date();
    now.setHours(hours);
    now.setMinutes(minutes);
    now.setSeconds(seconds);
    const state = {
      time: now
    };

    const oldSessions = JSON.parse(localStorage.getItem('sessions') || '{"sessions": []}');
    const newSessions = [...(oldSessions.sessions || []), state];
    localStorage.setItem('sessions', JSON.stringify({ sessions: newSessions }));
    console.log(newSessions);
  }





  return (
    <>
      <div className="p-4 sm:p-8 bg-gradient-to-l from-orange-100 to-sky-100 rounded-lg shadow-lg">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center text-primary-dark">Kronometre</h1>
        <div className="text-[3.5rem] md:text-9xl lg:text-[9rem] mb-10 text-center text-primary-dark font-mono font-normal">
          {formatNumber(hours)}:{formatNumber(minutes)}:
          {formatNumber(seconds)}
        </div>
        <div className="flex justify-center sm:justify-between items-center sm:gap-0 gap-2 flex-wrap">
          <div className="flex gap-2 md:gap-4">
            <Button
              onClick={start}
              disabled={isRunning}
              className={`py-1 px-3 md:px-4 lg:px-6  lg:py-2 rounded-lg ${isRunning
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-amber-600 hover:bg-amber-700'
                } text-white font-semibold transition-all duration-500 ease-in-out border-none lg:text-xl md:text-lg sm:text-base text-sm `}
            >
              Başlat
            </Button>
            <Button
              onClick={pause}
              disabled={!isRunning}
              className={`py-1 px-3 md:px-4 lg:px-6  lg:py-2 rounded-lg ${!isRunning
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
              className=" py-1 px-3 md:px-4 lg:px-6  lg:py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all duration-500 ease-in-out border-none lg:text-xl md:text-lg sm:text-base text-sm"
            >
              Sıfırla
            </Button>
          </div>
          <div className="w-full sm:w-auto">
            <Button
              onClick={() => {
                handleWorkEnd();
                reset(new Date(), false);
              }}
              className="inline-block w-full py-1 px-3 md:px-4 lg:px-6 lg:py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition-all duration-500 ease-in-out border-none lg:text-xl md:text-lg sm:text-base text-sm"
            >
              Çalışmayı Bitir
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-8 bg-gradient-to-l from-orange-100 to-sky-100 rounded-lg shadow-lg mt-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center text-primary-dark">Çalışma Geçmişi</h1>
        <div className="mt-4">
          <OldSessionChart />
        </div>
      </div>
    </>
  );
};
