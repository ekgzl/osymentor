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

import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../../config/firebase-config.tsx";

import { GoogleCircle, Eye, EyeClosed } from "iconoir-react";
import { LoginSchema } from "../../formikSchemas/LoginSchema.tsx";

import Swal from "sweetalert2";
import { handleGoogleLogin } from "../../utils/authHelpers.tsx";
import axios from "axios";

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

  const isMobileOrTablet = () => {
    return window.innerWidth <= 768; // Örneğin, 768px ve altı mobil/tablet olarak kabul edilir
  };

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
        //-----------FIREBASE---------
        signInWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            Toast.fire({
              icon: "success",
              title: "Giriş başarılı! Uygulamaya aktarılıyorsun..",
              timer: 1000,
            }).then(() => {
              navigate("/app");
            });
            resetForm();
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Swal.fire({
              title: errorCode,
              text: errorMessage,
              icon: "error",
              confirmButtonText: "Devam et",
              confirmButtonColor: "#37474f",
              // SweetAlert2 css'leri globalde ayarladım
              customClass: {
                container: "swal2-container-custom",
                popup: "swal2-popup-custom",
              },
            });
            console.log(errorCode, errorMessage);
            setFieldValue("password", "").then((r) => console.log(r));
          });
      },
    });
  const [inputType, setInputType] = React.useState("password");

  // 🔹 Google ile giriş başlat
  const handleGoogleRedirect = async () => {
    console.log("Google yönlendirme başlatılıyor...");
    try {
      await signInWithRedirect(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error("Google Redirect Error:", error);
    }
  };

  // 🔹 Sayfa yüklendiğinde Google yönlendirme sonucunu kontrol et
  React.useEffect(() => {
    const fetchRedirectResult = async () => {
      console.log("Google yönlendirme sonucu bekleniyor...");

      try {
        const result = await getRedirectResult(auth);

        if (result) {
          console.log("Google yönlendirme sonucu geldi:", result);
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;

          await axios
            .post(
              `${import.meta.env.VITE_API_URL}/api/v1/login`,
              { idToken: token },
              { withCredentials: true }
            )
            .then(() => {
              console.log("Giriş başarılı, yönlendiriliyor...");
              navigate("/app");
            })
            .catch((error) => {
              console.error("Giriş yapılırken hata oluştu:", error);
            });
        } else {
          console.log("Google yönlendirme sonucu gelmedi.");
        }
      } catch (error) {
        console.error(
          "Google yönlendirme sonucu alınırken hata oluştu:",
          error
        );
      }
    };

    fetchRedirectResult();
  }, [navigate]); // `navigate` değişirse useEffect tekrar çalışır

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
            onClick={() => {
              /*
useNavigate Hook'u:
- React Router'da sayfalar arasında yönlendirme yapmak için kullanılır.
- Bileşen içinde tanımlanmalı ve yalnızca React bileşenleri içinde kullanılabilir.
- Fonksiyonel bir bileşen içinde, diğer import ifadelerinin hemen altında tanımlanmalıdır.
- Yönlendirme yapmak için navigate('/yeni-yol') şeklinde kullanılabilir.
- navigate fonksiyonu, yönlendirme sonrası state veya parametre geçmek için de kullanılabilir.
*/
              if (isMobileOrTablet()) {
                handleGoogleRedirect();
              } else {
                handleGoogleLogin(navigate);
              }
            }}
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
