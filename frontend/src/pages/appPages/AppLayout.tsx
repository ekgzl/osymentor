import { Outlet } from "react-router-dom";
import { SidebarComp } from "../../components/appComponents/Sidebar";
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { NavbarComp } from "../../components/appComponents/Navbar";
import { FooterComp } from "../../components/Footer";

export const AppLayout = () => {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebar.isSidebarOpen
  );

  return (
    <>
      <div className="flex min-h-screen bg-[#121212]">
        {/* SIDEBAR */}
        <div
          /* SIDEBAR kayma EFEKTI --girerken oluyor çıkarken yapamadım */
          className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"}`}
        >
          {isSidebarOpen && <SidebarComp />}
        </div>

        {/* NAVBAR AND CONTENT */}
        <div className={"flex flex-col w-full"}>
          <div className={"w-full"}>
            <NavbarComp></NavbarComp>
          </div>
          {/* CONTENT */}
          <div className={"w-full p-4"}>
            <Outlet />
          </div>
        </div>
      </div>
      <FooterComp></FooterComp>
    </>
  );
};
