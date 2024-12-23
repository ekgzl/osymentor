"use client";

import { Card } from "@material-tailwind/react";

export function BlogCard1Comp() {
  return (
    <Card className="flex flex-wrap max-w-full h-[18rem] w-auto rounded-3xl flex-col text-left bg-[#6482AD] sm:p-4 p-2">
      <Card.Body className="flex h-full sm:flex-row flex-col items-center justify-between gap-x-10">
        <p
          className={
            "text-3xl font-medium text-white tracking-tight leading-tight"
          }
        >
          Sınava hazırlık
          <br /> sürecinde yardıma
          <br /> mı ihtiyacın var?
        </p>
        <div className={"-mb-28"}>
          {/*min-w tarayıcı küçüldüğünde fotoğraf küçülmesin diye koydum sonra sildim..*/}
          <img
  className="max-w-full max-h-96 h-auto w-auto"
  alt={"telefon goruntusu"}
  src={"/phone1.png"}
></img>

        </div>
      </Card.Body>
    </Card>
  );
}
