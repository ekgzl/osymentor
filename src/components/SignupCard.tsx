"use client";

import * as React from "react";
import { useFormik } from "formik";
import {
  Button,
  Input,
  Typography,
  IconButton,
} from "@material-tailwind/react";

import { GoogleCircle, Eye, EyeClosed } from "iconoir-react";
import { SignupSchema } from "../formikSchemas/SignupSchema.tsx";
import Swal from "sweetalert2";
// `users.json`dan veriyi al
import initialUsers from "../data/users.json";
import { useNavigate } from "react-router-dom";
// localStorage'dan kullanıcıları al veya JSON'dan başlat
const getUsers = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : initialUsers;
};

// önce bir kullanıcı tanımla
type User = {
  email: string;
  password: string;
};

// kullanıcıyı kaydet locale
const saveUser = (newUser: User) => {
  const users: User[] = getUsers();
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
};

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export default function SignupCardComp() {
  const navigate = useNavigate();
  const [inputType, setInputType] = React.useState("password");
  // (tekrar) için olan useState
  const [inputType2, setInputType2] = React.useState("password");
  //-------FORMIK------
  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        password2: "",
      },
      validationSchema: SignupSchema,
      validateOnChange: false, // her input değişikliğinde validation yapma
      validateOnBlur: true, // her inputun dışına çıkıldığında validation yap
      onSubmit: (values, { resetForm }) => {
        // Kullanıcı var mı kontrol et
        const users = getUsers();
        const userExists = users.some(
          (user: User) => user.email === values.email,
        );

        if (userExists) {
          Swal.fire({
            title: "Bu e-posta adresi zaten kayıtlı.",
            text: "Lütfen tekrar deneyin",
            icon: "error",
            confirmButtonText: "Devam et",
            confirmButtonColor: "#37474f",
            width: "28%",
          });
          return;
        }

        // Yeni kullanıcı ekle
        const newUser = { email: values.email, password: values.password };
        saveUser(newUser);
        Toast.fire({
          icon: "success",
          title: "Kayıt başarılı! Giriş ekranına aktarılıyorsun..",
        }).then(() => {
          navigate("/login");
        });

        resetForm();
      },
    });

  return (
    <div className="grid place-items-center w-full h-full sm:p-2">
      <div className="w-full max-w-[95%] mx-auto p-1 sm:p-2">
        <Typography as="h2" type="h2" className="mb-2 text-center text-3xl md:text-4xl sm:text-3xl">
          Kayıt Ol
        </Typography>
        <Typography className="text-foreground text-center text-sm lg:text-lg md:text-lg sm:text-base">
          Kayıt olmak için e-posta adresinizi ve şifrenizi girin.
        </Typography>
        {/*Button bir mouse event beklediği için `handleSubmit` kullanılamıyor o yüzden burada onSubmit kullanıp butonun type submit yaptım*/}
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-4 space-y-1">
            <Typography
              /*Burada label olarak kullanılıyor text yani. */ as="label"
              /* htmlFor id değeri email olan input alanını işaret ediyor.*/
              /* eposta yazısına mouse geldiğinde input alanına odaklanır.  */ htmlFor="email"
              type="small"
              color="default"
              className="font-semibold text-xs sm:text-sm"
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
            {/*eğer email input alanına focus geldiğinde ve hata varsa hata mesajını ekrana yaz*/}
            {touched.email && errors.email && (
              <p className={"text-red-700 text-xs "}>{errors.email}</p>
            )}
          </div>
          <div className="mb-4 space-y-1">
            <Typography
              as="label"
              htmlFor="password"
              type="small"
              color="default"
              className="font-semibold text-xs sm:text-sm"
            >
              Şifre
            </Typography>
            <Input
              size="lg"
              id="password"
              type={inputType}
              placeholder="Şifre"
              value={values.password}
              onChange={handleChange}
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
            {touched.password && errors.password && (
              <p className={"text-red-700 text-xs "}>{errors.password}</p>
            )}
          </div>
          <div className="mb-5 space-y-1">
            <Typography
              as="label"
              htmlFor="password2"
              type="small"
              color="default"
              className="font-semibold text-xs sm:text-sm"
            >
              Şifre (Tekrar)
            </Typography>
            <Input
              size="lg"
              id="password2"
              type={inputType2}
              placeholder="Şifre"
              value={values.password2}
              onChange={handleChange}
              /*kullanıcı bir form alanına tıklayıp alanın dışına çıktığında tetiklenir*/
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
                  setInputType2(inputType2 === "password" ? "text" : "password")
                }
              >
                {inputType2 === "password" ? (
                  <EyeClosed className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Input.Icon>
            </Input>
            {touched.password2 && errors.password2 && (
              <p className={"text-red-700 text-xs"}>{errors.password2}</p>
            )}
          </div>
          <Button  type={"submit"} className={"text-xs lg:text-base md:text-sm sm:text-sm my-2"} size="md" isFullWidth>
            Kayıt Ol
          </Button>
        </form>
        <div className={"flex items-center justify-between gap-x-4"}>
          <Button
            color="secondary"
            variant={"outline"}
            as={"a"}
            href={"/login"}
            size="sm"
            isFullWidth
            className="text-xs lg:text-base md:text-sm sm:text-sm"
          >
            Zaten bir hesaba sahibim
          </Button>

          <Button className="text-xs lg:text-base md:text-sm sm:text-sm" size="sm" variant="outline" color="secondary" isFullWidth>
            <GoogleCircle className="xl:w-7 xl:h-7 sm:w-5 sm:h-5 mr-2" /> Google ile kayıt ol
          </Button>
        </div>
      </div>
    </div>
  );
}
