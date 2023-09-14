import AgeStep from "./AgeStep";
import { useContext } from "react";
import { LanguageContext } from "./LanguageContext";

const InfoSteps = () => {
  const { language } = useContext(LanguageContext) || { language: "en" };

  interface Translations {
    [key: string]: {
      next: string;
    };
  }

  const translations: Translations = {
    fr: {
      next: "Suivant",
    },
    en: {
      next: "Next",
    },
  };

  const translationKey = language || "en";
  const { next } = translations[translationKey];
  return (
    <div className="infos-step-component">
      <AgeStep />
      <div className="next-btn text-center py-4 px-6 mt-12">
        <span className="text-white uppercase">{next}</span>
      </div>
    </div>
  );
};

export default InfoSteps;
