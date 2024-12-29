"use client";

import { Button, Card } from "@material-tailwind/react";

export function BlogCard10Comp() {
  return (
    <Card className="flex flex-wrap max-w-full w-auto h-[14rem] rounded-3xl flex-col text-left bg-[#06090f] p-2">
      <Card.Body className="flex h-full flex-row items-center justify-around sm:gap-x-2 gap-x-5">
        <div className={"flex flex-col gap-y-6"}>
          <p
            className={
              "text-2xl sm:text-3xl font-medium text-white tracking-tight leading-tight"
            }
          >
            Tablet, telefon
            <br /> ve bilgisayardan erişim.{" "}
          </p>
          <div>
            <Button
              size={"md"}
              className={"rounded-3xl bg-white border-none hover:bg-amber-50"}
              as={"a"}
              href="/signup"
            >
              <p className={"text-black text-xs sm:text-lg font-semibold "}>
                Ücretsiz Kayıt Ol
              </p>
            </Button>
          </div>
        </div>

        <div className={"object-cover"}>
          {/*min-w burada tarayıcı küçüldüğünde fotoğraf küçülmesin diye koydum. BÖYLE KULLAN FOTOĞRAF KÜÇÜLÜYOR YOKSA.*/}
          <img
            className="h-[14rem] w-full object-cover "
            alt={"telefon goruntusu"}
            src={"/cross.png"}
          ></img>
        </div>
      </Card.Body>
    </Card>
  );
}
