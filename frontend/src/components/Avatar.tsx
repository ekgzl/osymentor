"use client";
// ekg deneme
import { Avatar, Typography } from "@material-tailwind/react";
export function AvatarComp() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Avatar src="/avatar.png" alt="avatar" shape="rounded" />

        <div>
          <Typography>Enes Kaan Gözüela</Typography>

          <Typography type="small" className="text-foreground">
            KPSS Öğrencisi
          </Typography>
        </div>
      </div>
    </div>
  );
}
