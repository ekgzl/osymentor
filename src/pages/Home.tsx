import { FooterComp } from "../components/Footer.tsx";
import { NavbarComp } from "../components/Navbar.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../app/Store.ts";
import { SidebarComp } from "../components/Sidebar.tsx";

export const HomePage = () => {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebar.isSidebarOpen,
  );

  return (
    <>
      <body className={"flex min-h-screen bg-gray-400"}>
        <div
          /* SIDEBAR kayma EFEKTI --girerken oluyor çıkarken yapamadım */
          className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"}`}
        >
          {isSidebarOpen && <SidebarComp />}
        </div>

        <div className={"w-full"}>
          <NavbarComp></NavbarComp>
        </div>
      </body>
      <FooterComp></FooterComp>
    </>
  );
};
