"use client";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../features/drawer/SidebarSlice.ts";
import {
  IconButton,
  Typography,
  Input,
  Collapse,
  Navbar,
} from "@material-tailwind/react";

import {
  Archive,
  Menu,
  MultiplePages,
  ProfileCircle,
  Search,
  SelectFace3d,
  Xmark,
} from "iconoir-react";
import { BadgeComp } from "./Badge.tsx";
import { AvatarComp } from "./Avatar.tsx";
import { MenuScale } from "iconoir-react/regular";
import { RootState } from "../../app/Store.ts";

const LINKS = [
  {
    icon: MultiplePages,

    title: "Pages",

    href: "#",
  },

  {
    icon: ProfileCircle,

    title: "Account",

    href: "#",
  },

  {
    icon: SelectFace3d,

    title: "Blocks",

    href: "#",
  },

  {
    icon: Archive,

    title: "Docs",

    href: "#",
  },
];

function NavList() {
  return (
    <ul className="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
      {LINKS.map(({ icon: Icon, title, href }) => (
        <li key={title}>
          <Typography
            as="a"
            href={href}
            type="small"
            className="flex items-center gap-x-2 p-1 hover:text-primary"
          >
            <Icon className="h-4 w-4" />

            {title}
          </Typography>
        </li>
      ))}
    </ul>
  );
}

export function NavbarComp() {
  const [openNav, setOpenNav] = React.useState(false);
  const dispatch = useDispatch();
  React.useEffect(() => {
    window.addEventListener(
      "resize",

      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebar.isSidebarOpen,
  );

  return (
    <Navbar className="mx-auto w-full rounded-none">
      <div className="flex items-center justify-between mx-3">
        <div className="flex items-center gap-3">
          {isSidebarOpen ? (
            <MenuScale
              className={"cursor-pointer hover:text-[#F28A2E] duration-300"}
              onClick={() => dispatch(toggleSidebar())}
            ></MenuScale>
          ) : (
            <Menu
              className={"cursor-pointer hover:text-[#F28A2E] duration-300"}
              onClick={() => dispatch(toggleSidebar())}
            ></Menu>
          )}

          <div className="hidden lg:block">
            {/*TODO: bu kısım path'e göre değişecek. örn: /profile*/}
            {/*<NavList />*/}
          </div>

          <div className="w-52">
            <Input color="warning" placeholder="Arama...">
              <Input.Icon>
                <Search className="h-full w-full" />
              </Input.Icon>
            </Input>
          </div>
        </div>
        <div className={"flex items-center gap-4"}>
          <BadgeComp></BadgeComp>
          <AvatarComp></AvatarComp>
        </div>

        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => setOpenNav(!openNav)}
          className="ml-1 grid lg:hidden"
        >
          {openNav ? (
            <Xmark className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </IconButton>
      </div>

      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
