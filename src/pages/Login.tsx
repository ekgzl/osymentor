import { AnimatedTextComp } from "../components/AnimatedText.tsx";
import { LoginCardComp } from "../components/LoginCard.tsx";

export const LoginPage = () => {
  return (
    <>
      <body
        className={
          // burada flex-col dikeyde justify center ile merkez yapmak için.
          "bg-gradient-to-t from-orange-200 to-sky-200 min-h-screen flex flex-col justify-center"
        }
      >
        {/*mx auto burada tarayıcı küçüldüğünde ortalamak için.*/}
        <div
          className={
            "bg-white w-[60rem] h-[35rem] rounded-3xl mx-auto flex items-center"
          }
        >
          <AnimatedTextComp></AnimatedTextComp>
          <LoginCardComp></LoginCardComp>
        </div>
      </body>
    </>
  );
};
