import { useContext } from "react";
import { LanguageContext } from "./LanguageContext";

const AgeStep = () => {
  const { language } = useContext(LanguageContext) || { language: "en" };

  interface Translations {
    [key: string]: {
      starting: string;
      age: string;
    };
  }

  const translations: Translations = {
    fr: {
      starting:
        "Pour commencer a vous créer un programme ils nous faudrait quelques informations",
      age: "Quel age avez vous ?",
    },
    en: {
      starting:
        "To start creating a program for you we would need some information",
      age: "How old are you ?",
    },
  };

  const translationKey = language || "en";
  const { starting, age } = translations[translationKey];

  return (
    <div className="info-step-component">
      <div className="flex flex-col items-center justify-center">
        <h5 className="text-white text-base text-center p-7 pb-0">
          {starting}
        </h5>
        <h5 className="text-white mt-1 text-3xl">{age}</h5>
        <div className="container md:mt-12 mt-8">
          <div className="grid grid-cols-2 gap-5 age-container">
            <span className="age-btn py-16 text-center">18 - 25</span>
            <span className="age-btn py-16 text-center">26 - 35</span>
            <span className="age-btn py-16 text-center">36 - 55</span>
            <span className="age-btn py-16 text-center">55 - 75</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeStep;
