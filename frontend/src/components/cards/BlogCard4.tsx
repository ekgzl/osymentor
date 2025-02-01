"use client";

import { Button, Card } from "@material-tailwind/react";

export function BlogCard4Comp() {
  return (
    <Card className="flex flex-wrap max-w-full w-auto bt:h-[17rem] h-[14rem] rounded-3xl flex-col text-left bg-[#6482AD] p-2">
      <Card.Body className="flex h-full flex-col items-start justify-evenly ">
        <div>
          <p
            className={
              "text-2xl sm:text-2xl font-medium text-white tracking-tight leading-tight"
            }
          >
            Öğrencilerin %94'ü çalışma verimliliklerini platformumuzda arttırdı.{" "}
          </p>
        </div>
        <div>
          <Button
            className={"rounded-3xl bg-orange-50 border-none hover:bg-white"}
            as="a"
            href="/signup"
          >
            <p className={" font-worksans sm:text-lg bt:text-lg lg:text-base text-base text-gray-700"}>
              Ücretsiz Kayıt Ol
            </p>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
