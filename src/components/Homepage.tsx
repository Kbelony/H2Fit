import BackgroundVideo from "../assets/videos/pexels.mp4";
import BackgroundVideoDesktop from "../assets/videos/pexels-2.mp4"; // Assurez-vous d'importer la vidéo dans votre projet
import { useContext } from "react";
import { LanguageContext } from "./LanguageContext";
import { Link } from "react-router-dom";

const Homepage = () => {
  const { language } = useContext(LanguageContext) || { language: "en" };

  interface Translations {
    [key: string]: {
      slogan1: string;
      slogan2: string;
      slogan3: string;
      paragraph: string;
      signIn: string;
      signUp: string;
    };
  }

  const translations: Translations = {
    fr: {
      slogan1: "Get Fit",
      slogan2: "Get Strong",
      slogan3: "Get Healthy",
      paragraph:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi,quibusdam. Quia harum delectus veniam cupiditate optio nobis beatae alias porro, amet ipsum, natus eum quisquam dolorum nesciunt velit dolore. Aliquam?",
      signIn: "Se connecter",
      signUp: "S'inscrire",
    },
    en: {
      slogan1: "Get Fit",
      slogan2: "Get Strong",
      slogan3: "Get Healthy",
      paragraph:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi,quibusdam. Quia harum delectus veniam cupiditate optio nobis beatae alias porro, amet ipsum, natus eum quisquam dolorum nesciunt velit dolore. Aliquam?",
      signIn: "Login",
      signUp: "Sign Up",
    },
  };

  const translationKey = language || "en";
  const { slogan1, slogan2, slogan3, paragraph, signIn, signUp } =
    translations[translationKey];
  return (
    <div className="homepage-component">
      <div className="mobile-view">
        <video
          autoPlay
          loop
          muted
          playsInline // Ajoutez cette ligne
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={BackgroundVideo} type="video/mp4" />
          Votre navigateur ne prend pas en charge la vidéo HTML5.
        </video>

        <div className="fixed top-2 left-0 w-full h-full flex flex-col justify-start text-white">
          <div className="slogan text-5xl mt-80">
            <h1 className="z-10 ml-3 mb-2">{slogan1}</h1>
            <h1 className="z-10 ml-3 mb-2">{slogan2}</h1>
            <h1 className="z-10 ml-3 mb-2">{slogan3}</h1>
          </div>
          <div className="paragraph">
            <p className="ml-4">{paragraph}</p>
          </div>
          <div className="btn-group flex flex-row items-center justify-center mt-5">
            <Link to={"/step/"}>
              <span className="sign-up-btn px-16 py-4 mr-2 text-center">
                {signUp}
              </span>
            </Link>
            <span className="sign-in-btn  py-4 ml-2 text-center">{signIn}</span>
          </div>
        </div>
      </div>
      <div className="desktop-view">
        <video
          autoPlay
          loop
          muted
          playsInline // Ajoutez cette ligne
          preload="auto"
          className="absolute top-28 left-0 w-full vids object-cover z-0"
        >
          <source src={BackgroundVideoDesktop} type="video/mp4" />
          Votre navigateur ne prend pas en charge la vidéo HTML5.
        </video>

        <div className="absolute top-25 left-0 w-full h-full flex flex-col justify-start text-white">
          <div className="slogan text-center text-5xl mt-80">
            <h1 className="z-10 ml-3 mb-2">
              {slogan1}, {slogan2}
            </h1>
            <h1 className="z-10 ml-3 mb-2">{slogan3}</h1>
          </div>
          <div className="btn-group flex flex-row items-center justify-center mt-5">
            <Link to={"/step/"}>
              <span className="sign-up-btn px-16 py-4 mr-2 text-center">
                {signUp}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
