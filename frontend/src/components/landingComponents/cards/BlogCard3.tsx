"use client";

import { Card } from "@material-tailwind/react";

export function BlogCard3Comp() {
  return (
    <Card className="flex flex-wrap bt:h-[30rem] lg:h-[24rem] sm:h-[30rem] h-[20rem] max-w-full w-auto rounded-3xl flex-col text-center bg-[#716F81] p-2">
      <Card.Body className="flex h-full flex-col items-center justify-around">
        <div className={"sm:-mt-24 -mt-52"}>
          <img
            className="max-w-full max-h-96 h-auto w-auto"
            alt={"telefon goruntusu"}
            src={"/tablet1.png"}
          ></img>
        </div>
        <div>
          <p
            className={
              "text-3xl font-medium text-white tracking-tight leading-tight"
            }
          >
            Çalışma istatistiklerini kontrol et{" "}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}
