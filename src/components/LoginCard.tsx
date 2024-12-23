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
import { LoginSchema } from "../formikSchemas/LoginSchema.tsx";
import initialUsers from "../data/users.json";

import Swal from "sweetalert2";

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
  const navigate = useNavigate();

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
          (user: User) => user.email === values.email,
        );

        if (!userExists) {
          Swal.fire({
            title: "Kullanıcı bulunamadı!",
            text: "Lütfen tekrar deneyin",
            icon: "error",
            confirmButtonText: "Devam et",
            confirmButtonColor: "#37474f",
            width: "28%",
          });

          return;
        }

        const user = users.find((user: User) => user.email === values.email);
        if (user?.password !== values.password) {
          Swal.fire({
            title: "Şifre hatalı!",
            text: "Lütfen tekrar deneyin",
            icon: "error",
            confirmButtonText: "Enter",
            confirmButtonColor: "#37474f",
            width: "28%",
          });

          // sadece şifre alanını sıfırlar
          setFieldValue("password", "").then((r) => console.log(r));
          return;
        }

        localStorage.setItem("token", "bearer-token");
        localStorage.setItem("username", values.email.split("@")[0]);
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
    <div className="grid place-items-center w-full h-full p-2 ">
      <div className="w-full max-w-md mx-auto p-2">
        <Typography as="h2" type="h4" className="mb-2 text-center">
          Giriş Yap
        </Typography>
        <Typography className="text-foreground text-center">
          E-posta adresi ve şifre ile giriş yap
        </Typography>
        <form onSubmit={handleSubmit} className="mt-10">
          <div className="mb-4 space-y-1">
            <Typography
              /*Burada label olarak kullanılıyor text yani. */ as="label"
              /* htmlFor id değeri email olan input alanını işaret ediyor.*/
              /* eposta yazısına mouse geldiğinde input alanına odaklanır.  */ htmlFor="email"
              type="small"
              color="default"
              className="font-semibold "
            >
              E-posta
            </Typography>
            <Input
              size="lg"
              /* label alanında veya farklı alanlar içinm kullanılır */ id="email"
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
              type="small"
              color="default"
              className="font-semibold"
            >
              Şifre
            </Typography>
            <Input
              size="lg"
              id="password"
              type={inputType}
              placeholder="Şifre"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
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
            {errors.password && touched.password && (
              <p className={"text-red-700 text-xs "}>{errors.password}</p>
            )}
          </div>
          <Button type={"submit"} size="md" isFullWidth>
            Giriş Yap
          </Button>
        </form>
        <div className="my-4">
          <Button size="md" variant="outline" color="secondary" isFullWidth>
            <GoogleCircle className="w-5 h-5 mr-2" /> Google ile giriş yap
          </Button>
        </div>
        <Typography className="flex items-center justify-center gap-1 text-foreground">
          Hesabın yok mu?
          <Typography
            color="primary"
            as="a"
            href="/signup"
            className="font-semibold"
          >
            Hesap oluştur
          </Typography>
        </Typography>
      </div>
    </div>
  );
}
