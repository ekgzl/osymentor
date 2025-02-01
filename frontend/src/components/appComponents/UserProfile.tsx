"use client";

// @components
import { Card, Avatar, Typography, Button } from "@material-tailwind/react";
import InfoComp from "./Info";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
// @icons
import { DesignPencil } from "iconoir-react";

import { useState } from "react";

export default function UserProfileComp() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  return (
    <Card variant="solid" color="default">
      <Card.Header className="m-0 w-full p-6 flex items-center gap-6 flex-wrap justify-between">
        <div className="relative h-64 w-full">
          <img
            src="https://r4.wallpaperflare.com/wallpaper/402/655/812/vincent-van-gogh-stars-reflection-water-boat-classic-art-wallpaper-eb991daa14443783fc324de9389ee8bd.jpg"
            alt="background"
            className="absolute inset-0 w-full h-full rounded-md object-cover object-bottom
            "
          />
        </div>
        <div className="flex sm:items-center gap-6 justify-between flex-wrap flex-col sm:flex-row w-full">
          <div className="flex items-center gap-4">
            <Avatar
              src={user.avatar}
              alt="avatar"
              size="lg"
              className="shrink-0"
            />
            <div className="space-y-1">
              <Typography className="font-semibold">{user.username}</Typography>
              <Typography type="small" className="block text-foreground">
                {user.email}
                <br />
                {user.exam} Öğrencisi
              </Typography>
            </div>
          </div>
          <div className="flex items-center flex-wrap gap-2">
            <Button
              variant="outline"
              color="secondary"
              onClick={() => setIsOpen(!isOpen)}
            >
              <DesignPencil className="mr-2 w-5 h-5" />
              Düzenle
            </Button>
          </div>
        </div>
      </Card.Header>
      <Card.Body className="px-6 pb-6 pt-20">
        {isOpen && <InfoComp />}
      </Card.Body>
    </Card>
  );
}
