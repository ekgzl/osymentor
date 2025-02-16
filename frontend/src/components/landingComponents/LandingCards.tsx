import { BlogCard1Comp } from "../cards/BlogCard1.tsx";
import { BlogCard2Comp } from "../cards/BlogCard2.tsx";
import { BlogCard3Comp } from "../cards/BlogCard3.tsx";
import { BlogCard4Comp } from "../cards/BlogCard4.tsx";
import { BlogCard5Comp } from "../cards/BlogCard5.tsx";
import { VideoCard1Comp } from "../cards/VideoCard1.tsx";
import { BlogCard6Comp } from "../cards/BlogCard6.tsx";
import { BlogCard7Comp } from "../cards/BlogCard7.tsx";
import { BlogCard8Comp } from "../cards/BlogCard8.tsx";
import { BlogCard9Comp } from "../cards/BlogCard9.tsx";
import { BlogCard10Comp } from "../cards/BlogCard10.tsx";

export const LandingCardsComp = () => {
  return (
    <div className={"flex flex-col gap-y-6 flex-wrap lg:basis-6/12 basis-full"}>
      <BlogCard1Comp></BlogCard1Comp>
      <div
        className={
          "flex flex-row items-center flex-wrap justify-between sm:gap-0 gap-y-6"
        }
      >
        <div className={"sm:basis-[48%] basis-full"}>
          <BlogCard2Comp></BlogCard2Comp>
        </div>
        <div className={"sm:basis-[48%] basis-full "}>
          <BlogCard3Comp></BlogCard3Comp>
        </div>
      </div>
      <div
        className={
          "flex flex-row items-center justify-between flex-wrap bt:gap-0 gap-y-6"
        }
      >
        <div className={"bt:basis-[66%] basis-full"}>
          <BlogCard4Comp></BlogCard4Comp>
        </div>
        <div className={"bt:basis-[30%] basis-full"}>
          <BlogCard5Comp></BlogCard5Comp>
        </div>
      </div>
      <div
        className={
          "flex flex-row items-start justify-between gap-y-6 flex-wrap"
        }
      >
        <div className={"sm:basis-[48%] basis-full"}>
          <VideoCard1Comp></VideoCard1Comp>
        </div>
        <div className={"sm:basis-[48%] basis-full flex flex-col gap-y-6"}>
          <div>
            <BlogCard6Comp></BlogCard6Comp>
          </div>
          <div>
            <BlogCard7Comp></BlogCard7Comp>
          </div>
        </div>
      </div>
      <div
        className={
          "flex flex-row items-center justify-between flex-wrap sm:gap-0 gap-y-6"
        }
      >
        <div className={"sm:basis-[48%] basis-full"}>
          <BlogCard8Comp></BlogCard8Comp>
        </div>
        <div className={"sm:basis-[48%] basis-full"}>
          <BlogCard9Comp></BlogCard9Comp>
        </div>
      </div>
      <BlogCard10Comp></BlogCard10Comp>
    </div>
  );
};

export default LandingCardsComp;
