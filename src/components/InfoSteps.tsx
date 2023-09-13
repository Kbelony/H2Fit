import { useContext } from "react";
import { LanguageContext } from "./LanguageContext";

const InfoSteps = () => {
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
        <h5 className="text-white mt-3 text-3xl">{age}</h5>
        <div className="container md:mt-25 mt-48">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-white text-center">1</div>
            <div className="text-white text-center">1</div>
            <div className="text-white text-center">1</div>
            <div className="text-white text-center">1</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSteps;
