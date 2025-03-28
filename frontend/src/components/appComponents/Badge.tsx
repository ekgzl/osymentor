"use client";
import { Badge, IconButton } from "@material-tailwind/react";

import { Bell } from "iconoir-react";

export function BadgeComp() {
  return (
    <Badge color={"warning"}>
      <Badge.Content>
        <IconButton color={"primary"}>
          <Bell className="h-4 w-4 stroke-2" />
        </IconButton>
      </Badge.Content>

      <Badge.Indicator>3</Badge.Indicator>
    </Badge>
  );
}
