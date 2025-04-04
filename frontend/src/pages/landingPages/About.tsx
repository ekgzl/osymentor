import {
  Typography,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="container mx-auto py-16">
      <section className="relative h-96 rounded-xl overflow-hidden mt-8 mb-16">
        <img
          src="https://c4.wallpaperflare.com/wallpaper/582/562/545/8k-stars-4k-dark-space-wallpaper-preview.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center p-8">
          <div className="text-white">
            <Typography variant="h1" className="mb-4 text-4xl md:text-6xl">
              Eğitimin Geleceğini Tasarlıyoruz
            </Typography>
            <Typography variant="lead" className="mb-8 text-xl">
              Teknoloji ve Psikolojiyi Birleştiren Öğrenci Dostu Çözümler
            </Typography>
            <Link to="/services">
              <Button size="lg" color="secondary">
                Hizmetlerimizi Keşfet
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <Card className="mb-16 px-4 flex flex-col items-center gap-6 justify-center">
        <CardHeader className="text-center">
          <Typography
            variant="h1"
            className="text-2xl text-orange-600 font-bold"
          >
            Misyonumuz
          </Typography>
        </CardHeader>

        <div className="flex flex-row gap-12 items-center justify-center md:flex-nowrap flex-wrap">
          <CardBody>
            <Typography className="text-lg leading-relaxed">
              Öğrencilerin sınav stresini azaltırken, %47 daha verimli öğrenme
              deneyimi sunmak. Yapay zeka ve bilimsel metodları harmanlayarak
              kişiye özel eğitim ekosistemi oluşturuyoruz.
            </Typography>
          </CardBody>

          <div className="flex flex-wrap gap-4 text-center mb-6 md:flex-nowrap">
            {[
              { value: "98%", label: "Memnuniyet Oranı" },
              { value: "2000+", label: "Desteklenen Öğrenci" },
              { value: "2025", label: "Kuruluş Yılı" },
            ].map((stat, idx) => (
              <Card key={idx} className="p-6 bg-blue-950 rounded-lg shadow-md">
                <Typography
                  variant="h3"
                  className="text-white mb-2 font-mono font-semibold"
                >
                  {stat.value}
                </Typography>
                <Typography variant="small" className="text-gray-300">
                  {stat.label}
                </Typography>
              </Card>
            ))}
          </div>
        </div>
      </Card>

      {/*TODO
      TEAM SECTION
      */}

      {/* Features Grid */}
      <Card className="px-4 pb-4">
        <CardHeader>
          <Typography
            variant="h1"
            className="text-center mb-16 text-2xl font-bold text-orange-600"
          >
            Bizi Özel Kılanlar
          </Typography>
        </CardHeader>

        <div className="grid md:grid-cols-3 gap-8 ">
          {[
            {
              icon: "🧠",
              title: "Bilimsel Altyapı",
              content: "Tüm modüllerimiz ekibimiz tarafından geliştirildi",
            },
            {
              icon: "🤖",
              title: "AI Odaklı",
              content:
                "Gerçek zamanlı analiz için makine öğrenmesi algoritmaları",
            },
            {
              icon: "❤️",
              title: "Öğrenci Dostu",
              content: "Kullanıcı deneyimi odaklı minimalist arayüz tasarımı",
            },
          ].map((feature, idx) => (
            <Card
              key={idx}
              className="text-center p-6 border rounded-xl hover:shadow-lg transition bg-blue-950 text-white"
            >
              <Typography variant="h1" className="mb-4">
                {feature.icon}
              </Typography>
              <Typography variant="h5" className="mb-4 font-semibold">
                {feature.title}
              </Typography>
              <Typography>{feature.content}</Typography>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AboutPage;
