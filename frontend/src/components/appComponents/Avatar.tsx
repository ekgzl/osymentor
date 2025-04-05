"use client";
// ekg deneme
import { Avatar, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

export function AvatarComp() {
  const user = useSelector((state: RootState) => state.user);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 ">
        <Avatar
          src={user.avatar}
          alt="avatar"
          shape="rounded"
          className="border-[#404040] border-2"
        />

        <div>
          <Typography className="text-white">{user.username}</Typography>

          <Typography type="small" className=" text-[#B3B3B3]">
            {user.exam} Öğrencisi
          </Typography>
        </div>
      </div>
    </div>
  );
}
