import { useContext } from "react";
import { LanguageContext } from "../components/LanguageContext";
// import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";

const Home = () => {
  const { language } = useContext(LanguageContext) || { language: "en" };
  const user = useSelector((state: RootState) => state.user);
  const userName = user.name;

  interface Translations {
    [key: string]: {
      hi: string;
      foryou: string;
    };
  }

  const translations: Translations = {
    fr: {
      hi: "Bonjour ",
      foryou: "Pour vous",
    },
    en: {
      hi: "Hey ",
      foryou: "For you",
    },
  };

  const translationKey = language || "en";
  const { hi, foryou } = translations[translationKey];

  return (
    <div className="home-component ">
      <div className="mobile-view mt-24">
        <div className="for-you-text text-2xl ml-10 text-white">
          <div className="hi-text">
            {hi}
            {userName} 👋
          </div>
          {foryou}
        </div>
      </div>
      <div className="desktop-view"></div>
    </div>
  );
};

export default Home;
