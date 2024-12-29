import { Outlet } from "react-router-dom";
import { LandingNavbarComp } from "../../components/landingComponents/LandingNavbar";
import { FooterComp } from "../../components/Footer";

export const LandingLayout = () => {
  return (
    <>
      {/* 
        - sticky ve top-0: Navbarı sayfanın en üstüne sabitler
        - z-50: Navbarın en üstte görünmesi
      */}
      <div className="sticky top-0 z-50">
        <LandingNavbarComp /> {/* her sayfa için sabit navbar */}
      </div>
      <body className="bg-gradient-to-t from-orange-100 to-sky-100 min-h-screen">
        <Outlet /> {/* dinamik olarak değişen içerik */}

      </body>
      <FooterComp></FooterComp>
    </>
  );
};
