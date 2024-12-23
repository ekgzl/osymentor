"use client";

import { Card } from "@material-tailwind/react";

export function BlogCard6Comp() {
  return (
    <Card className="flex flex-wrap max-w-full w-auto bt:h-[18rem] lg:h-[15rem] sm:h-[18rem] h-[18rem] rounded-3xl flex-col text-center bg-[#716F81] p-2">
      <Card.Body className="flex h-full flex-col items-center justify-evenly">
        <img className={"w-auto h-auto max-h-[11rem] sm:max-h-[9rem] bt:max-h-[9rem] lg:max-h-[7rem]"} src="/graph1.png" alt="avatar" />

        <div>
          <p className={"text-3xl lg:text-2xl bt:text-3xl font-medium text-white tracking-tight"}>
            Kendi çalışma topluluğunu kur.
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}
