import { Button } from "@material-tailwind/react";

import { Avatar } from "@material-tailwind/react";
import { TypeAnimation } from "react-type-animation";

export const LandingLeftBodyComp = () => {
  return (
    // lg ile büyük ekranlarda ikili görüntü, aksinde küçükte tekli görüntü sağladım
    <div
      className={
        "flex flex-col gap-y-5 sm:gap-y-8 flex-wrap lg:basis-5/12 basis-full"
      }
    >
      <div
        className={
          // TRACKING BURADA LETTER SPACINGI sıkışıyor
          //md ile büyük ekranlarda 7xl, aksinde 6xl yapıyorum
          "md:text-7xl text-6xl font-semibold leading-extra-tight tracking-[-0.03em] font-worksans bg-gradient-to-r from-[#F28A2E]  to-[#ed551c] inline-block text-transparent bg-clip-text"
        }
      >
        <p className="pt-1">
          Öğrenmeyi ve <br /> kazanmayı <br /> basit hale getiren
          <br /> platform.{" "}
        </p>
      </div>
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
          <Avatar size={"lg"} alt="user 3" className="" src="/avatar1.png" />
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
          <p className={" font-worksans tracking-tight text-blue-950 text-lg"}>
            <span className={"font-semibold text-xl sm:text-3xl"}>2000 +</span>
            <br />
            Öğrenci ösyMentor ile sınavlarına hazırlanıyor.
          </p>
        </div>
      </div>
      <div>
        <Button className={"rounded-3xl"} size={"xl"} as={"a"} href="/signup">
          <p className={"font-worksans font-medium text-lg"}>
            Ücretsiz Kayıt Ol
          </p>
        </Button>
      </div>
    </div>
  );
};

export default LandingLeftBodyComp;
