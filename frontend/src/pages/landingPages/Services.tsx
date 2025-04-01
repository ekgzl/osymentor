import {
  Typography,
  Card,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import services from "../../data/services.json";

function ServicesPage() {
  return (
    <div className="container mx-auto py-16">
      <div className="mb-16 text-center lg:mb-28">
        <Typography variant="h6" className="text-lg">
          Hizmetler
        </Typography>
        <Typography variant="h1" className="my-2 !text-2xl lg:!text-4xl">
          Sınavınız için rehberlik hizmeti
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto w-full !text-gray-500 max-w-4xl"
        >
          Ekibimiz en iyi hizmetleri sunmaya adanmıştır.
        </Typography>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Card key={index} className="shadow-lg">
            <img
              src={service.image}
              alt={service.title}
              className="h-64 w-full object-cover rounded-t-lg"
            />
            <CardBody>
              <Typography variant="h5" className="font-bold">
                {service.title}
              </Typography>
              <Typography className="mt-2 text-gray-600">
                {service.description}
              </Typography>
              <ul className="mt-4 list-disc pl-5 text-gray-600">
                {service.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                as="a"
                href={service.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Daha Fazlası
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;
