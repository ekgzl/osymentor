"use client";

import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useFormik } from "formik";

import { GoogleCircle, Eye, EyeClosed } from "iconoir-react";
import { LoginSchema } from "../../formikSchemas/LoginSchema.tsx";
import initialUsers from "../../data/users.json";

import Swal from "sweetalert2";

import { useDispatch } from "react-redux";
import { setUser } from "../../../features/drawer/UserSlice";

// önce bir kullanıcı tanımla
type User = {
  email: string;
  password: string;
};

// localStorage'dan kullanıcıları al veya JSON'dan başlat
const getUsers = () => {
  const users = localStorage.getItem("users");
  // eger tarayıcıda yoksa dosyadan cek
  return users ? JSON.parse(users) : initialUsers;
};

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export function LoginCardComp() {
  // useStateler function içinde tanımlanmalı!!
  const [capsLockOn, setCapsLockOn] = React.useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginSchema,
      validateOnChange: false, // her input değişikliğinde validation yapma
      validateOnBlur: true, // her inputun dışına çıkıldığında validation yap
      onSubmit: (values, { resetForm, setFieldValue }) => {
        const users = getUsers();
        const userExists = users.some(
          (user: User) => user.email === values.email
        );

        if (!userExists) {
          Swal.fire({
            title: "Kullanıcı bulunamadı!",
            text: "Lütfen tekrar deneyin",
            icon: "error",
            confirmButtonText: "Devam et",
            confirmButtonColor: "#37474f",
            customClass: {
              container: "swal2-container-custom",
              popup: "swal2-popup-custom",
            },
          });

          return;
        }

        const user = users.find((user: User) => user.email === values.email);
        if (user?.password !== values.password) {
          Swal.fire({
            title: "Şifre hatalı!",
            text: "Lütfen tekrar deneyin",
            icon: "error",
            confirmButtonText: "Devam et",
            confirmButtonColor: "#37474f",
            // SweetAlert2 css'leri globalde ayarladım
            customClass: {
              container: "swal2-container-custom",
              popup: "swal2-popup-custom",
            },
          });

          // sadece şifre alanını sıfırlar
          setFieldValue("password", "").then((r) => console.log(r));
          return;
        }

        localStorage.setItem("token", "bearer-token");
        const toUser = {
          username: user.email.split("@")[0],
          email: user.email,
          exam: "KPSS",
          avatar:
            "https://storage.evrimagaci.org/old/mi_media/afcae823e61eefb077e1f223594b1e7f.jpeg",
          birthdate: "",
        };
        localStorage.setItem("user", JSON.stringify(toUser));
        dispatch(setUser(toUser));
        Toast.fire({
          icon: "success",
          title: "Giriş başarılı! Uygulamaya aktarılıyorsun..",
        }).then(() => {
          navigate("/app");
        });
        resetForm();
      },
    });
  const [inputType, setInputType] = React.useState("password");
  return (
    <div className="grid place-items-center w-full sm:p-6 md:p-8">
      <div className="w-full max-w-[93%] mx-auto p-4 sm:p-6">
        <Typography
          as="h2"
          className="mb-2 text-center font-bold text-3xl md:text-5xl sm:text-4xl"
        >
          Giriş Yap
        </Typography>
        <Typography className="text-foreground text-center text-sm lg:text-lg md:text-lg sm:text-base">
          E-posta adresi ve şifre ile giriş yap
        </Typography>
        <form onSubmit={handleSubmit} className="mt-10">
          <div className="mb-4 space-y-1">
            <Typography
              /*Burada label olarak kullanılıyor text yani. */ as="label"
              /* htmlFor id değeri email olan input alanını işaret ediyor.*/
              /* eposta yazısına mouse geldiğinde input alanına odaklanır.  */ htmlFor="email"
              color="default"
              className="font-semibold text-xs  sm:text-sm"
            >
              E-posta
            </Typography>
            <Input
              className="text-xs lg:text-base md:text-sm sm:text-xs"
              size="lg"
              id="email"
              type="email"
              placeholder="E-posta"
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <p className={"text-red-700 text-xs "}>{errors.email}</p>
            )}
          </div>
          <div className="mb-9 space-y-1">
            <Typography
              as="label"
              htmlFor="password"
              color="default"
              className="font-semibold text-xs sm:text-sm"
            >
              Şifre
            </Typography>
            <Input
              className="text-xs lg:text-base md:text-sm sm:text-xs"
              size="lg"
              id="password"
              type={inputType}
              placeholder="Şifre"
              onChange={handleChange}
              value={values.password}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                handleBlur(e);
                setIsPasswordFocused(false);
                setCapsLockOn(false);
              }}
              onFocus={() => setIsPasswordFocused(true)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                setCapsLockOn(e.getModifierState("CapsLock"))
              }
              onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
                setCapsLockOn(e.getModifierState("CapsLock"))
              }
            >
              <Input.Icon
                as={IconButton}
                type="button"
                variant="ghost"
                placement="end"
                color="secondary"
                className="data-[placement=end]:right-1.5 !absolute select-auto z-10 pointer-events-auto"
                onClick={() =>
                  setInputType(inputType === "password" ? "text" : "password")
                }
              >
                {inputType === "password" ? (
                  <EyeClosed className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Input.Icon>
            </Input>
            {capsLockOn && isPasswordFocused && (
              <p className="text-yellow-700 text-xs">Caps Lock açık</p>
            )}
            {errors.password && touched.password && (
              <p className={"text-red-700 text-xs "}>{errors.password}</p>
            )}
          </div>
          <Button
            type={"submit"}
            className="text-sm  lg:text-base md:text-base sm:text-sm"
            isFullWidth
          >
            Giriş Yap
          </Button>
        </form>
        <div className="mt-4 mb-16 sm:my-4">
          <Button
            className="text-sm  lg:text-base md:text-base sm:text-sm"
            variant="outline"
            color="secondary"
            isFullWidth
          >
            <GoogleCircle className="xl:w-7 xl:h-7 sm:w-5 sm:h-5 mr-2" /> Google
            ile giriş yap
          </Button>
        </div>
        <Typography className="flex items-center justify-center gap-1 text-foreground text-xs sm:text-base">
          Hesabın yok mu?
          <Typography
            color="primary"
            as="a"
            href="/signup"
            className="font-semibold text-xs sm:text-base"
          >
            Hesap oluştur
          </Typography>
        </Typography>
      </div>
    </div>
  );
}
