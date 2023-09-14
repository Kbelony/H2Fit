import { useContext } from "react";
import { LanguageContext } from "../LanguageContext";

const DaysStep = () => {
  const { language } = useContext(LanguageContext) || { language: "en" };

  interface Translations {
    [key: string]: {
      starting: string;
      level: string;
      beginner: string;
      intermediate: string;
      confirmed: string;
      expert: string;
    };
  }

  const translations: Translations = {
    fr: {
      starting:
        "Pour commencer a vous créer un programme ils nous faudrait quelques informations",
      level: "À quelle fréquence voulez-vous vous entraîner ?",
      beginner: "1 - 2 jours par semaine",
      intermediate: "3 - 4 jours par semaine",
      confirmed: "5 - 6 jours par semaine",
      expert: "Tout les jours !",
    },
    en: {
      starting:
        "To start creating a program for you we would need some information",
      level: "How often do you want to workout ?",
      beginner: "1 - 2 day per week",
      intermediate: "3 - 4 day per week",
      confirmed: "5 - 6 day per week",
      expert: "Every day !",
    },
  };

  const translationKey = language || "en";
  const { starting, level, beginner, intermediate, confirmed, expert } =
    translations[translationKey];

  return (
    <div className="level-step-component">
      <div className="flex flex-col items-center justify-center">
        <h5 className="text-white text-base text-center p-7 pb-0">
          {starting}
        </h5>
        <h5 className="text-white mt-1 text-center text-3xl">{level}</h5>
        <div className="container md:mt-12 mt-8">
          <div className="grid grid-cols-2 gap-5 age-container">
            <span className="age-btn py-16 text-center">{beginner}</span>
            <span className="age-btn py-16 text-center">{intermediate}</span>
            <span className="age-btn py-16 text-center">{confirmed}</span>
            <span className="age-btn py-16 text-center">{expert}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaysStep;
