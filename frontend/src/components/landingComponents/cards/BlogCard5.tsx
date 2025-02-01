"use client";

import { Avatar, Card } from "@material-tailwind/react";
import { ArrowRight } from "iconoir-react/regular";

export function BlogCard5Comp() {
  return (
    <Card className="flex flex-wrap max-w-full w-auto bt:h-[17rem] h-[13rem] rounded-3xl flex-col text-left bg-gradient-to-t from-[#6482AD] to-[#324156] p-2">
      <Card.Body className="flex h-full flex-col items-left justify-around">
        <div className={"mx-auto"}> 
          <Avatar
            src="/justmentor.png"
            alt="avatar"
            shape="circular"
            size={"xl"}
            className="border border-orange-500 ring-4 ring-orange-500/20"
          ></Avatar>
        </div>
        {/* 1198px */}
        <div>
          <p className={"text-2xl  font-medium text-white tracking-tight"}>
            Yapay zeka mentorumuz ile çalış.
          </p>
        </div>

        <a href={"/app"}>
          <div className={"flex items-center gap-x-3"}>
            <p className={"text-lg  font-medium text-white tracking-tighter"}>
              Daha fazla
            </p>
            <ArrowRight fontSize={"10px"} color={"white"}></ArrowRight>
          </div>
        </a>
      </Card.Body>
    </Card>
  );
}
