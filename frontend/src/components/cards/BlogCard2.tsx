"use client";

import { Card } from "@material-tailwind/react";

export function BlogCard2Comp() {
  return (
    <Card className="flex flex-wrap max-w-full w-auto bt:h-[30rem] lg:h-[24rem] sm:h-[30rem] h-[20rem] rounded-3xl flex-col text-center bg-[#B97A95] p-2">
      <Card.Body className="flex h-full flex-col items-center justify-around">
        <p
          className={
            "text-3xl font-medium text-white tracking-tight leading-tight"
          }
        >
          Denemelerini geçmişe dönük olarak analiz et
        </p>
        <div className={"-mb-28"}>
          <img
            className="max-w-full max-h-96 h-auto w-auto"
            alt={"telefon goruntusu"}
            src={"/phone1.png"}
          ></img>
        </div>
      </Card.Body>
    </Card>
  );
}
