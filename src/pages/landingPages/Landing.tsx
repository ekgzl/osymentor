import { LandingCardsComp } from "../../components/landingComponents/LandingCards.tsx";
import LandingLeftBodyComp from "../../components/landingComponents/LandingLeftBody.tsx";


export const LandingPage = () => {
  return (
    <>
      <div className={"flex items-start pt-10 sm:pt-20 gap-y-10 w-10/12 mx-auto justify-between flex-wrap"}>
        {/* 
            - lg:sticky: Sadece geniş ekranlarda sticky özelliği aktif olur
            - lg:top-40: Navbar'ın altında kalacak şekilde 40 birim boşluk bırakır
            - leftbody sağdaki kartlar bitene kadar ekranda sabit kalır
          */}
        <div className="lg:sticky lg:top-40 lg:basis-5/12 basis-full">
          <LandingLeftBodyComp></LandingLeftBodyComp>
        </div>

        <div className="lg:basis-6/12 basis-full">
          <LandingCardsComp></LandingCardsComp>
        </div>
      </div>
    </>
  );
};
