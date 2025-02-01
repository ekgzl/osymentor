"use client";

import { Card } from "@material-tailwind/react";

export function BlogCard7Comp() {
  return (
    <Card className="flex flex-wrap max-w-full w-auto bt:h-[18rem] lg:h-[15rem] sm:h-[18rem] h-[18rem] rounded-3xl flex-col text-center bg-[#B97A95] p-2">
      <Card.Body className="flex h-full flex-col items-center justify-between gap-y-2 ">
        <img className={"w-auto h-auto max-h-[9rem] bt:max-h-[8rem] lg:max-h-[7rem] sm:max-h-[8rem]"} src="/graph2.png" alt="avatar" />
        <div>
          <p className={"text-3xl lg:text-2xl bt:text-3xl font-medium text-white tracking-tight"}>
            Hazır çalışma şablonları ile başarıya ulaş.{" "}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}
