"use client";

import * as React from "react";

import {
  Button,
  IconButton,
  Typography,
  Collapse,
  Navbar,
} from "@material-tailwind/react";

import { Menu, Xmark } from "iconoir-react";

const LINKS = [
  {
    title: "Hakkımızda",

    href: "#",
  },

  {
    title: "Hizmetler",

    href: "#",
  },

  {
    title: "Sponsorlar",

    href: "#",
  },

  {
    title: "İletişim",

    href: "#",
  },
];

function NavList() {
  return (
    <ul className="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
      {LINKS.map(({ title, href }) => (
        <li key={title}>
          <Typography
            as="a"
            href={href}
            type="small"
            className="flex items-center gap-x-2 p-1 hover:text-orange-600"
          >
            <p className={"text-lg font-sans "}>{title}</p>
          </Typography>
        </li>
      ))}
    </ul>
  );
}

export function LandingNavbarComp() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",

      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  return (
    <div className="w-full">
      <Navbar>
        <div className="sticky lg:mx-auto w-full flex items-center lg:justify-around justify-start px-6">
          {/*------------LOGO ve HR------------*/}
          <div className={"flex items-center gap-3 -mt-0.25 mb-2"}>
            <img
              src="/logo_navbar.png"
              alt="nature-image"
              className="ml-1 h-16 w-56 object-fill object-center"
            />
            <hr className="ml-1 mr-1.5 hidden h-5 w-px border-l border-t-0 border-secondary-dark lg:block" />
          </div>
          {/*----------NAVBAR LINKLER LISTESI---------*/}
          <div className="hidden lg:block">
            <NavList />
          </div>
          {/*--------------GIRIS YAP VE KAYIT OL------------*/}
          <div className={"flex items-center gap-x-2"}>
            <Button
              variant="ghost"
              size="lg"
              /*BUTONU TRANSPARAN YAPMA border transparent yapmazsan sağa kayıyor.*/
              className={
                "rounded-3xl hover:border-transparent hover:bg-transparent hover:text-blue-700 hover:shadow-none hidden lg:inline-block border-none px-8"
              }
              as={"a"}
              href={"/login"}
            >
              Giriş Yap
            </Button>

            <Button
              size="lg"
              className="mr-3 hidden lg:inline-block hover:bg-amber-600 border-none rounded-3xl px-8"
              as={"a"}
              href={"/signup"}
            >
              Kayıt Ol
            </Button>
          </div>

          <IconButton
            size="sm"
            variant="ghost"
            color="secondary"
            onClick={() => setOpenNav(!openNav)}
            className="ml-auto grid lg:hidden h-7"
          >
            {openNav ? (
              <Xmark className="h-7 w-7" />
            ) : (
              <Menu className="h-7 w-7" />
            )}
          </IconButton>
        </div>

        <Collapse open={openNav}>
          <NavList />

          <Button isFullWidth size="sm" className="mt-3 border-none">
            Giriş yap
          </Button>
          <Button
            isFullWidth
            size="sm"
            className="mt-2 mb-3 hover:bg-amber-600 border-none"
          >
            Kayıt Ol
          </Button>
        </Collapse>
      </Navbar>
    </div>
  );
}
