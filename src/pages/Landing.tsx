import { LandingNavbarComp } from "../components/LandingNavbar.tsx";

import { TypeAnimation } from "react-type-animation";
import { Avatar, Button } from "@material-tailwind/react";
import { BlogCard1Comp } from "../components/cards/BlogCard1.tsx";
import { BlogCard2Comp } from "../components/cards/BlogCard2.tsx";
import { BlogCard3Comp } from "../components/cards/BlogCard3.tsx";
import { BlogCard4Comp } from "../components/cards/BlogCard4.tsx";
import { BlogCard5Comp } from "../components/cards/BlogCard5.tsx";
import { VideoCard1Comp } from "../components/cards/VideoCard1.tsx";
import { BlogCard6Comp } from "../components/cards/BlogCard6.tsx";
import { BlogCard7Comp } from "../components/cards/BlogCard7.tsx";
import { BlogCard8Comp } from "../components/cards/BlogCard8.tsx";
import { BlogCard9Comp } from "../components/cards/BlogCard9.tsx";
import { BlogCard10Comp } from "../components/cards/BlogCard10.tsx";

export const LandingPage = () => {
  return (
    <>
      <LandingNavbarComp></LandingNavbarComp>

      <body
        className={
          "bg-gradient-to-t from-orange-100 to-sky-100 min-h-screen "
        }
      >
        {/* 10/12 ve w-10/12 ile sayfayı ortalıyorum */}
        <div className={"flex items-start pt-10 sm:pt-20 gap-y-10 w-10/12 mx-auto justify-between  flex-wrap"}>
        {/* lg ile büyük ekranlarda ikili görüntü, aksinde küçükte tekli görüntü sağladım */}
          <div className={"flex flex-col gap-y-5 sm:gap-y-8 flex-wrap lg:basis-5/12 basis-full"}>
            <p
              className={
                // TRACKING BURADA LETTER SPACINGI sıkışıyor
                //md ile büyük ekranlarda 7xl, aksinde 6xl yapıyorum
                "md:text-7xl text-6xl font-semibold leading-extra-tight tracking-[-0.04em] font-worksans bg-gradient-to-r from-[#F28A2E]  to-[#ed551c] inline-block text-transparent bg-clip-text"
              }
            >
              Öğrenmeyi ve <br /> kazanmayı <br /> basit hale getiren
              <br /> platform.{" "}
            </p>
            <div>
              <TypeAnimation
                sequence={[
                  "Sınavlarda tam başarı: ",
                  1000, // wait 1s
                  "Sınavlarda tam başarı: YKS",
                  1000,
                  "Sınavlarda tam başarı: DGS",
                  1000,
                  "Sınavlarda tam başarı: KPSS",
                  1000,
                  "Sınavlarda tam başarı: YDS",
                  1000,
                  "Sınavlarda tam başarı: TUS",
                  1000,
                  "Sınavlarda tam başarı: DUS",
                  1000,
                ]}
                // Küçük ekranlar için text-xl, orta ve büyük ekranlar için md:text-3xl kullanıldı.
                wrapper="span"
                speed={20}
                className=" text-xl md:text-3xl text-blue-950"
                repeat={Infinity}
              />
            </div>
            {/*---------AVATAR------------*/}
            <div className={"flex flex-row gap-2 sm:gap-3 items-center flex-wrap"}>
              <div className="flex items-center -space-x-4">
                <Avatar
                  size={"lg"}
                  alt="user 1"
                  className="hover:z-10 focus:z-10"
                  src="/avatar5.png"
                />
                <Avatar
                  size={"lg"}
                  alt="user 2"
                  className="hover:z-10 focus:z-10"
                  src="/avatar4.png"
                />
                <Avatar
                  size={"lg"}
                  alt="user 3"
                  className=""
                  src="/avatar1.png"
                />
                <Avatar
                  size={"lg"}
                  alt="user 4"
                  className="hover:z-10 focus:z-10"
                  src="/avatar2.png"
                />

                <Avatar
                  size={"lg"}
                  alt="user 5"
                  className=" hover:z-10 focus:z-10"
                  src="/avatar3.png"
                />
              </div>
              <div>
                <p
                  className={
                    " font-worksans tracking-tight text-blue-950 text-lg"
                  }
                >
                  <span className={"font-semibold text-xl sm:text-3xl"}>2000 +</span>
                  <br />
                  Öğrenci ösyMentor ile sınavlarına hazırlanıyor.
                </p>
              </div>
            </div>
            <div>
              <Button
                className={"rounded-3xl"}
                size={"xl"}
                as={"a"}
                href="/signup"
              >
                <p className={"font-worksans font-medium text-lg"}>
                  Ücretsiz Kayıt Ol
                </p>
              </Button>
            </div>
          </div>
          {/*------------------ANA MENÜDE SAĞDAKİ KARTLAR-----------*/}
          <div className={"flex flex-col gap-y-6 flex-wrap lg:basis-6/12 basis-full"}>
            <BlogCard1Comp></BlogCard1Comp>
            <div className={"flex flex-row items-center flex-wrap justify-between sm:gap-0 gap-y-6"}>
              <div className={"sm:basis-[48%] basis-full"}><BlogCard2Comp></BlogCard2Comp></div>
              <div className={"sm:basis-[48%] basis-full "}><BlogCard3Comp></BlogCard3Comp></div>
            </div>
            <div className={"flex flex-row items-center justify-between flex-wrap bt:gap-0 gap-y-6"}>
              <div className={"bt:basis-[66%] basis-full"}><BlogCard4Comp></BlogCard4Comp></div>
              <div className={"bt:basis-[30%] basis-full"}><BlogCard5Comp></BlogCard5Comp></div>
            </div>
            <div className={"flex flex-row items-start justify-between gap-y-6 flex-wrap"}>
              <div className={"sm:basis-[48%] basis-full"}><VideoCard1Comp></VideoCard1Comp></div>
              <div className={"sm:basis-[48%] basis-full flex flex-col gap-y-6"}>
                <div><BlogCard6Comp></BlogCard6Comp></div>
               <div><BlogCard7Comp></BlogCard7Comp></div> 
              </div>
            </div>
            <div className={"flex flex-row items-center justify-between flex-wrap sm:gap-0 gap-y-6"}>
              <div className={"sm:basis-[48%] basis-full"}><BlogCard8Comp></BlogCard8Comp></div>
              <div className={"sm:basis-[48%] basis-full"}><BlogCard9Comp></BlogCard9Comp></div>
            </div>
            <BlogCard10Comp></BlogCard10Comp>
          </div>
        </div>
      </body>
    </>
  );
};
