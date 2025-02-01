import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useFormik } from "formik";
import { ContactSchema } from "../../formikSchemas/ContactSchema";
import Swal from "sweetalert2";



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


export function ContactPage() {

  const [isClicked, setIsClicked] = useState(false);

  //-------FORMIK------
  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: {
        topic: "",
        name: "",
        surname: "",
        email: "",
        message: "",
      },
      validationSchema: ContactSchema,
      validateOnChange: false, // her input değişikliğinde validation yapma
      validateOnBlur: true, // her inputun dışına çıkıldığında validation yap
      onSubmit: (values, { resetForm }) => {
        values.topic = isClicked ? "Teknik destek" : "Genel soru";
        console.log(values);
        Toast.fire({
          icon: "success",
          title: "Mesajınız gönderildi",
        }).then(() => {
          resetForm();
        });
      },

    });



  return (

    <section className="px-8 py-8 lg:py-16">
      <div className="container mx-auto text-center">
        <Typography
          variant="h5"
          color="primary"
          className="mb-3 !text-base lg:!text-2xl"
        >
          Ekibimiz ile iletişime geçin
        </Typography>
        <Typography
          variant="h1"
          color="primary"
          className="mb-3 !text-3xl lg:!text-5xl font-bold bg-gradient-to-r from-[#F28A2E] to-[#ed551c] inline-block text-transparent bg-clip-text"
        >
          {/* türkçe karakterler gradient yapılırken kırpılıyor pb-1 ile bu durumu düzelttim */}
          <p className="pb-1">Sana yardım etmek için buradayız</p>
        </Typography>
        <Typography className="mb-10 font-normal sm:text-lg !text-md lg:mb-20 mx-auto max-w-3xl !text-gray-500">
          Hizmetlerimiz hakkında bir soru, teknik destek isteği veya geliştirme
          önerisi, ekibimiz senin için her zaman hazırdır.
        </Typography>
        <div className="grid grid-cols-1 gap-x-12 gap-y-3 lg:grid-cols-2 items-start">
          <img
            src="/contact.png"
            alt="map"
            className="w-full h-full sm:max-h-[540px] lg:max-h-[520px] object-cover object-top"
          />
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 items-start">
              <Typography
                variant="small"
                className="text-left !font-semibold !text-gray-600"
              >
                İşletme ile ilgili seçenekler
              </Typography>
              <div className="flex gap-4">
                <Button
                  variant={!isClicked ? "solid" : "outline"}
                  className="max-w-fit"
                  onClick={() => setIsClicked(false)}
                >
                  Genel soru
                </Button>
                <Button
                  variant={isClicked ? "solid" : "outline"}
                  className="max-w-fit"
                  onClick={() => setIsClicked(true)}
                >
                  Teknik destek
                </Button>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 lg:max-w-sm text-left"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Typography
                    variant="small"
                    className="mb-2 text-left font-medium !text-gray-900"
                  >
                    Adınız
                  </Typography>
                  <Input
                    color="secondary"
                    size="lg"
                    placeholder="Adınız"
                    name="name"
                    className="focus:border-t-amber-600 focus:border-x-gray-400 focus:border-b-gray-400  border-gray-800 hover:border-gray-800"
                    onChange={handleChange}
                    value={values.name}
                    onBlur={handleBlur}
                  />
                  {touched.name && errors.name && (
                    <p className={"pl-1 text-red-700 text-xs "}>{errors.name}</p>
                  )}
                </div>
                <div>
                  <Typography
                    variant="small"
                    className="mb-2 text-left font-medium !text-gray-900"
                  >
                    Soyadınız
                  </Typography>
                  <Input
                    color="secondary"
                    size="lg"
                    placeholder="Soyadınız"
                    name="surname"
                    className="focus:border-t-amber-600 focus:border-x-gray-400 focus:border-b-gray-400 border-gray-800 hover:border-gray-800"
                    onChange={handleChange}
                    value={values.surname}
                    onBlur={handleBlur}
                  />
                  {touched.surname && errors.surname && (
                    <p className={"pl-1 text-red-700 text-xs "}>{errors.surname}</p>
                  )}
                </div>
              </div>
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium !text-gray-900"
                >
                  Email adresiniz
                </Typography>
                <Input
                  color="secondary"
                  size="lg"
                  placeholder="osyMentor@eposta.com"
                  name="email"
                  className="focus:border-t-amber-600 focus:border-x-gray-400 focus:border-b-gray-400 border-gray-800 hover:border-gray-800"
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && (
                  <p className={" pl-1 text-red-700 text-xs "}>{errors.email}</p>
                )}
              </div>
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium !text-gray-900"
                >
                  Mesajınız
                </Typography>
                <Textarea
                  rows={6}
                  color="secondary"
                  placeholder="Mesaj"
                  name="message"
                  className="focus:border-t-amber-600 focus:border-x-gray-400 focus:border-b-gray-400 border-gray-800 hover:border-gray-800"
                  onChange={handleChange}
                  value={values.message}
                  onBlur={handleBlur}
                />{touched.message && errors.message && (
                  <p className={"pl-1 text-red-700 text-xs "}>{errors.message}</p>
                )}
              </div>

              <Button className="w-full shadow-md bg-amber-600 hover:text-white border-none hover:border"
                type="submit"
              >
                Mesaj gönder
              </Button>
            </form></div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;