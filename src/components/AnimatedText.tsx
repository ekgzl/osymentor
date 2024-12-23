import { useState, useEffect } from "react";

export const AnimatedTextComp = () => {
  const words = ["KPSS", "YKS", "DUS", "TUS", "YDS", "DGS", "ALES"];

  const [currentWordIndex, setCurrentWordIndex] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) =>
        prevIndex === words.length - 1 ? 0 : prevIndex + 1,
      );
    }, 2000); // Her kelime 2 saniye kalır

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="h-full w-full rounded-l-3xl flex items-center justify-center bg-gradient-to-b from-sky-300 to-orange-300">
      <div className="text-center">
        {words.map((word, index) => (
          <div
            key={index}
            className={`transition-all duration-700 text-5xl font-bold  mt-3 mb-3 ${
              currentWordIndex === index
                ? "text-gray-700 opacity-100 text-6xl"
                : "text-gray-600 opacity-20"
            }`}
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
};
