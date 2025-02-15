"use client";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../../features/drawer/SidebarSlice.ts";
import { Input, Navbar } from "@material-tailwind/react";

import { Menu, Search } from "iconoir-react";
import { BadgeComp } from "./Badge.tsx";
import { AvatarComp } from "./Avatar.tsx";
import { MenuScale } from "iconoir-react/regular";
import { RootState } from "../../../app/store.ts";

export function NavbarComp() {
  const dispatch = useDispatch();

  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebar.isSidebarOpen
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
      </div>
    </Navbar>
  );
}
