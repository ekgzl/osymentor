"use client";

import * as React from "react";

// @components
import { DayPicker } from "react-day-picker";
import {
  Input,
  Select,
  Popover,
  Typography,
  Button,
} from "@material-tailwind/react";

// @utils
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useFormik } from "formik";
import { UserInfoSchema } from "../../formikSchemas/UserInfoSchema";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { auth } from "../../config/firebase-config";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/drawer/UserSlice";

type User = {
  username: string;
  email: string;
  exam: string;
  birthdate: string;
  avatar: string;
  email2: string;
  password: string;
};

function TextField({ label, ...props }: { label: string; [key: string]: any }) {
  const id = React.useId();

  return (
    <div className="w-full space-y-2">
      <Typography
        as="label"
        htmlFor={id}
        type="small"
        color="default"
        className="font-semibold"
      >
        {label}
      </Typography>
      <Input {...props} id={id} />
    </div>
  );
}

function InputSlot({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const id = React.useId();
  return (
    <div className="w-full">
      <Typography
        as="label"
        htmlFor={id}
        type="small"
        color="default"
        className="font-semibold mb-2 block text-start"
      >
        {label}
      </Typography>
      {children}
    </div>
  );
}

export default function InfoComp() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    setFieldValue,
  } = useFormik<User>({
    initialValues: {
      username: user.username,
      email: user.email,
      exam: user.exam,
      birthdate: user.birthdate,
      avatar: user.avatar,
      email2: user.email,
      password: "",
    },
    validationSchema: UserInfoSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm }) => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        return;
      }
      try {
        // reauthentication
        const credential = EmailAuthProvider.credential(
          user.email,
          values.password
        );
        await reauthenticateWithCredential(currentUser, credential);

        // validate password in client to verify account
        axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/user`,
          {
            username: values.username,
            email: values.email,
            exam: values.exam,
            avatar: values.avatar,
            birthdate: values.birthdate,
            _id: user._id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        dispatch(
          setUser({
            email: values.email,
            username: values.username,
            avatar: values.avatar,
            exam: values.exam,
            birthdate: values.birthdate,
            _id: user._id,
          })
        );

        if (user.email !== values.email) {
          // email update
          await verifyBeforeUpdateEmail(currentUser, values.email);

          await Swal.fire({
            icon: "success",
            title: "E-posta adresiniz güncellendi",
            text: "Lütfen mailinize gelen linkle e-posta adresinizi onaylayın ve yeniden giriş yapın.",
            confirmButtonText: "Çıkış Yap",
            confirmButtonColor: "#111827",
            willClose: () => {
              signOut(auth);
              axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/logout`, {
                withCredentials: true,
              });
            },
          });
          return;
        }
      } catch (error: any) {
        console.error("E-posta güncelleme hatası:", error.code);
        if (error.code === "auth/invalid-credential") {
          await Swal.fire({
            icon: "error",
            title: "Profil güncelleme hatası",
            confirmButtonText: "Tekrar dene",
            confirmButtonColor: "#E99421",
            text: "Geçersiz şifre girildi.",
          });
        }
        if (error.code === "auth/missing-password") {
          await Swal.fire({
            icon: "error",
            title: "Profil güncelleme hatası",
            text: "Şifre alanı doldurulmalıdır.",
            confirmButtonText: "Tekrar dene",
            confirmButtonColor: "#111827",
          });
        } else {
          await Swal.fire({
            icon: "error",
            title: "Profil güncelleme hatası",
            confirmButtonText: "Tekrar dene",
          });
        }
        return;
      }
      Swal.fire({
        icon: "success",
        title: "Profil güncellendi",
        confirmButtonText: "Devam et",
        confirmButtonColor: "#111827",
        willClose: () => {
          resetForm();
        },
      });
    },
  });

  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);

  /**
   * Click-Outside Detection Mekanizması
   *
   * Bu useEffect hook'u, DayPicker'ın dışına tıklandığında otomatik kapanmasını sağlar.
   * Nasıl Çalışır:
   * 1. DayPicker açıkken (isDatePickerOpen true olduğunda) bir mousedown event listener eklenir
   * 2. Kullanıcı herhangi bir yere tıkladığında:
   *    - '.datepicker-popover' class'ına sahip elementi bulur
   *    - Tıklanan yer (event.target) bu elementin dışındaysa DayPicker'ı kapatır
   * 3. DayPicker kapandığında event listener temizlenir (cleanup)
   *
   * Bu yöntem şu durumlarda DayPicker'ın kapanmasını sağlar:
   * - Başka bir input alanına tıklandığında
   * - Sayfanın boş bir alanına tıklandığında
   * - Herhangi başka bir UI elementine tıklandığında
   */
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const popover = document.querySelector(".datepicker-popover");
      if (popover && !popover.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
    };

    if (isDatePickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDatePickerOpen]);

  return (
    <div className="max-w-5xl mx-auto">
      <Typography className="font-semibold mb-1">Profil Bilgileri</Typography>
      <Typography as="p" type="small" className="text-foreground">
        Profil bilgilerinizi güncelleyebilirsiniz.
      </Typography>
      <form onSubmit={handleSubmit} action="#" className="mt-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-4">
          <TextField
            label="Kullanıcı Adı"
            placeholder="Kullanıcı Adınız"
            defaultValue={user.username}
            id="username"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.username && errors.username && (
            <p className="text-red-500 text-xs">{errors.username}</p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4">
          <InputSlot label="Doğum Tarihi">
            <Popover
              open={isDatePickerOpen}
              onOpenChange={(open) => setIsDatePickerOpen(open)}
            >
              <Popover.Trigger>
                <div
                  className="w-full cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDatePickerOpen(true);
                  }}
                >
                  <Input
                    readOnly
                    placeholder="Doğum Tarihi Seçiniz"
                    value={
                      values.birthdate
                        ? format(new Date(values.birthdate), "PPP", {
                            locale: tr,
                          })
                        : ""
                    }
                  />
                </div>
              </Popover.Trigger>
              <Popover.Content className="z-50 datepicker-popover">
                <Popover.Arrow />
                {/* 
                  DayPicker Komponenti ve Tarih Yönetimi:
                  - DayPicker Date objesiyle çalıştığı için string formatındaki tarihi Date'e çeviriyoruz
                  - setFieldValue ile tarihi ISO string formatında saklıyoruz (toISOString)
                  - Bu format backend ile uyumlu ve JSON'a dönüştürülebilir
                  - Formik form yönetimi ile entegre çalışır
                */}
                <DayPicker
                  mode="single"
                  hideNavigation
                  captionLayout="dropdown"
                  locale={tr}
                  selected={
                    values.birthdate ? new Date(values.birthdate) : undefined
                  }
                  onSelect={(date) => {
                    setFieldValue("birthdate", date ? date.toISOString() : "");
                    setIsDatePickerOpen(false);
                  }}
                  className="border-0"
                  classNames={{
                    day: "p-3",
                    today: "text-blue-500 rounded-full",
                    caption_label: "hidden",
                    dropdown: "mr-2 px-2 py-1 border rounded",
                    months: "flex flex-col space-y-4",
                    month: "space-y-2",
                  }}
                />
              </Popover.Content>
            </Popover>
          </InputSlot>
          <InputSlot label="Sınav">
            {/* Select komponenti sadece value döndürürken, Formik handleChange fonksiyonu
                { target: { name, value } } formatında bir event objesi bekler.
                Bu yüzden arrow function kullanarak, Select'ten gelen value'yu
                Formik'in beklediği formata dönüştürüyoruz. */}
            <Select
              value={values.exam}
              name="exam"
              onValueChange={(value) =>
                handleChange({ target: { name: "exam", value } })
              }
            >
              <Select.Trigger placeholder="Sınav Seçiniz" />
              <Select.List>
                <Select.Option value="YKS SAY">YKS-SAY</Select.Option>
                <Select.Option value="YKS EA">YKS-EA</Select.Option>
                <Select.Option value="YKS SOZ">YKS-SÖZ</Select.Option>
                {/* <Select.Option value="KPSS">KPSS</Select.Option>
                <Select.Option value="TUS">TUS</Select.Option>
                <Select.Option value="YDS">YDS</Select.Option> */}
              </Select.List>
            </Select>
          </InputSlot>
          {touched.exam && errors.exam && (
            <p className="text-red-500 text-xs">{errors.exam}</p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-4">
          <TextField
            type="email"
            label="E-Posta"
            placeholder="osymentor@mail.com"
            defaultValue={user.email}
            id="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {touched.email && errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
          <TextField
            type="email"
            label="E-Posta Doğrulama"
            placeholder="osymentor@mail.com"
            defaultValue={user.email}
            id="email2"
            name="email2"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email2}
          />
          {touched.email2 && errors.email2 && (
            <p className="text-red-500 text-xs">{errors.email2}</p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-4">
          <TextField
            type="password"
            label="Şifre"
            placeholder="Şifre"
            id="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {touched.password && errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>
        <Button type="submit">Gönder</Button>
      </form>
    </div>
  );
}
