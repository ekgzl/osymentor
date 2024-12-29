"use client";

import { Card } from "@material-tailwind/react";

export function BlogCard8Comp() {
  return (
    <Card className="flex flex-wrap max-w-full w-auto bt:h-[30rem] lg:h-[24rem] sm:h-[30rem] h-[20rem] rounded-3xl flex-col text-center bg-[#716F81] p-2">
      <Card.Body className="flex h-full flex-col items-center justify-around">
        <div className={"sm:-mt-24 -mt-52"}>
          <img
            className="max-w-full max-h-96 h-auto w-auto"
            alt={"telefon goruntusu"}
            src={"/tablet2.png"}
          ></img>
        </div>
        <div>
          <p
            className={
              "bt:text-3xl lg:text-[26px] text-3xl font-medium text-white tracking-tight leading-tight"
            }
          >
            Başardıkça kutla, motivasyonunu yükselt.
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}
