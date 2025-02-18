"use client";
import * as React from "react";

import {
  Card,
  List,
  Typography,
  Collapse,
  Button,
} from "@material-tailwind/react";

import {
  LeaderboardStar,
  // LogOut,
  DashboardDots,
  MoreHorizCircle,
  NavArrowRight,
  SelectFace3d,
  Timer,
  ProfileCircle,
  ChatLines,
  LogOut,
} from "iconoir-react";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase-config";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1200,
  timerProgressBar: true,
});
const Links = [
  {
    icon: DashboardDots,

    title: "Ana Sayfa",

    href: "/app",
  },

  {
    icon: Timer,

    title: "Kronometre",

    href: "/app/timekeeper",
  },

  {
    icon: LeaderboardStar,

    title: "Deneme Analizi",

    href: "/app/test",
  },
];

// #F28A2E turuncu
// #025373 acik mavi
// #030826 kapali mavi
export function SidebarComp() {
  const [isOpen, setIsOpen] = React.useState(false);

  // ------- ÇIKIŞ -------
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      //VITE_ veya NEXT_PUBLIC_ prefix'ini eklediğine emin ol.
      //Vite'de VITE_ Eğer sadece API_URL yazarsan, frontend’de çalışmaz.
      await signOut(auth);
      await axios.post(`${import.meta.env.API_URL}/api/v1/logout`, {
        withCredentials: true,
      });
      Toast.fire({
        icon: "success",
        title: "Çıkış başarılı...",
        timer: 1000,
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Card className="h-full max-w-[280px] rounded-none bg-[#030826] border-none flex flex-col items-center justify-between">
      <div>
        <Card.Header className="mx-3 mb-0 mt-3 flex items-center gap-2">
          <img
            className="object-fill object-center w-full h-28 p-6"
            /* PHOTO SRC DIŞINDA PUBLİC DOSYASINDA OLMALI BU BİR KURAL! ve direkt /logo.png olarak kullanılabilir*/
            src="/logo.png"
            alt="osyMentor Logo"
          />
        </Card.Header>

        <Card.Body className="p-3">
          <List>
            {Links.map(({ icon: Icon, title, href }) => (
              <List.Item
                key={title}
                className={
                  "cursor-pointer hover:bg-[#025373] focus:bg-[#182349]"
                }
                /* Burada list.item bir "a" elementi oluyor. */
                as={Link}
                /* Bu sayede href kullanılabilir. */
                to={href}
              >
                <List.ItemStart>
                  <Icon color="#F28A2E" className="h-[18px] w-[18px]" />
                </List.ItemStart>
                <p className={"text-white"}>{title}</p>
              </List.Item>
            ))}

            <hr className="-mx-3 my-3 border-secondary" />

            <List.Item
              className={"hover:bg-[#025373]"}
              onClick={() => setIsOpen((cur) => !cur)}
            >
              <List.ItemStart>
                <MoreHorizCircle
                  color="#F28A2E"
                  className="h-[18px] w-[18px]"
                />
              </List.ItemStart>
              <p className={"text-white"}>Daha fazla</p>
              <List.ItemEnd>
                <NavArrowRight
                  className={`h-4 w-4 ${isOpen ? "rotate-90" : ""}`}
                />
              </List.ItemEnd>
            </List.Item>

            <Collapse open={isOpen}>
              <List>
                <List.Item
                  as={Link}
                  to="/app/profile"
                  className={"hover:bg-[#025373] focus:bg-[#182349]"}
                >
                  <List.ItemStart>
                    <ProfileCircle
                      color="#F28A2E"
                      className="h-[18px] w-[18px]"
                    />
                  </List.ItemStart>
                  <p className={"text-gray-300"}>Profil</p>
                </List.Item>

                <List.Item
                  as={Link}
                  to="/app/social"
                  className={"hover:bg-[#025373] focus:bg-[#182349] "}
                >
                  <List.ItemStart>
                    <ChatLines color="#F28A2E" className="h-[18px] w-[18px]" />
                  </List.ItemStart>
                  <p className={"text-gray-300"}>Sosyal Alan</p>
                </List.Item>
              </List>
            </Collapse>

            <hr className="-mx-3 my-3 border-secondary" />

            <List.Item
              className="text-info hover:bg-info/10 hover:text-info focus:bg-info/10 focus:text-info cursor-pointer"
              onClick={handleLogout}
            >
              <List.ItemStart>
                <LogOut className="h-[18px] w-[18px]" color="#D22B2B" />
              </List.ItemStart>
              <p className="text-white">Çıkış Yap</p>
            </List.Item>
            {/*TODO: EĞER KULLANICI GİRİŞ YAPMIŞSA BU BUTON AKTİF OLMALI*/}
            {/*<List.Item className="text-error hover:bg-error/10 hover:text-error focus:bg-error/10 focus:text-error">
                        <List.ItemStart>
                            <LogOut className="h-[18px] w-[18px]" />
                        </List.ItemStart>
                        Logout
                    </List.Item>*/}
          </List>
        </Card.Body>
      </div>
      {/*TODO bu sidebar footer kısmı da kullanıcı giriş yaptığında aktif olmalı*/}
      <Card.Footer className="mt-10">
        <Card color="primary" className="shadow-none">
          <Card.Header className="m-3">
            <SelectFace3d className="h-10 w-10 text-primary-foreground" />
          </Card.Header>

          <Card.Body>
            <Typography type="h6" className="mb-1 text-white">
              Premium hesaba geç!
            </Typography>

            <Typography type="small" className="text-white/80">
              Denemelerdeki istatistiklerini yapay zeka koçumuzla analiz etmek
              için hemen premium hesaba geç!
            </Typography>
          </Card.Body>

          <Card.Footer>
            <Button
              size="sm"
              as="a"
              href="#"
              className="border-white bg-white text-black hover:border-white hover:bg-white hover:text-black"
            >
              Şimdi Hesabını Yükselt
            </Button>
          </Card.Footer>
        </Card>
      </Card.Footer>
    </Card>
  );
}
