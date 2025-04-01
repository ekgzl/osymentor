"use client";

import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const YEAR = new Date().getFullYear();

const LINKS = [
  {
    title: "Hakkımızda",

    href: "/about",
  },

  {
    title: "Hizmetler",

    href: "/services",
  },

  {
    title: "İletişim",

    href: "/contact",
  },
];

export function FooterComp() {
  return (
    <footer className=" px-12 flex w-full flex-row flex-wrap items-center justify-center gap-x-12 gap-y-3 border-surface py-4 text-center md:justify-between bg-[#030826]">
      <Typography color="secondary">&copy; {YEAR} Enes Kaan Gözüela</Typography>

      <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {LINKS.map(({ title, href }) => (
          <li key={title}>
            {/* as= link ve to: ile single page navigation yapılır*/}
            <Typography
              as={Link}
              to={href}
              className="text-slate-200 hover:text-amber-600"
            >
              {title}
            </Typography>
          </li>
        ))}
      </ul>
    </footer>
  );
}
