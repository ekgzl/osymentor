import { LandingNavbarComp } from "../components/LandingNavbar.tsx";
import { LandingCardsComp } from "../components/LandingCards.tsx";
import LandingLeftBodyComp from "../components/LandingLeftBody.tsx";


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
          <LandingLeftBodyComp></LandingLeftBodyComp>
          {/*------------------ANA MENÜDE SAĞDAKİ KARTLAR-----------*/}
          <LandingCardsComp></LandingCardsComp>
        </div>
      </body>
    </>
  );
};
