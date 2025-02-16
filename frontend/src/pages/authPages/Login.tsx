import { AnimatedTextComp } from "../../components/landingComponents/AnimatedText.tsx";
import { LoginCardComp } from "../../components/authComponents/LoginCard.tsx";

export const LoginPage = () => {
  return (
    <>
      <div
        className={
          // burada flex-col dikeyde justify center ile merkez yapmak için.
          "bg-gradient-to-t from-orange-200 to-sky-200 min-h-screen flex flex-col justify-center"
        }
      >
        {/*mx auto burada tarayıcı küçüldüğünde ortalamak için.*/}
        <div
          className={
            "bg-white w-full max-w-[90%] sm:max-w-[85%] xl:max-w-[80%] h-[38rem] sm:h-[35rem] rounded-3xl mx-auto flex items-center"
          }
        >
          <div className="sm:basis-4/12 md:basis-4/12 lg:basis-1/2 basis-4/12">
            <AnimatedTextComp></AnimatedTextComp>
          </div>
          <div className="sm:basis-8/12 md:basis-7/12 lg:basis-1/2 basis-8/12">
            <LoginCardComp></LoginCardComp>
          </div>
        </div>
      </div>
    </>
  );
};
