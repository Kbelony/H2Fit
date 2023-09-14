import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../LanguageContext";

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

  const [activeAge, setActiveAge] = useState<string | null>(null);

  // Fonction pour gérer le clic sur un bouton d'âge
  const handleAgeClick = (ageCategory: string) => {
    // Mettre à jour l'âge actif
    setActiveAge(ageCategory);

    // Stocker l'âge sélectionné dans le local storage
    localStorage.setItem("selectedAge", ageCategory);
  };

  useEffect(() => {
    const selectedAge = localStorage.getItem("selectedAge");
    if (selectedAge) {
      setActiveAge(selectedAge);
    }
  }, []);

  return (
    <div className="age-step-component">
      <div className="flex flex-col items-center justify-center">
        <h5 className="text-white text-base text-center p-7 pb-0">
          {starting}
        </h5>
        <h5 className="text-white mt-1 text-3xl">{age}</h5>
        <div className="container md:mt-12 mt-8">
          <div className="grid grid-cols-2 gap-5 age-container">
            <span
              className={`age-btn py-16 text-center ${
                activeAge === "18 - 25" ? "active" : ""
              }`}
              onClick={() => handleAgeClick("18 - 25")}
            >
              18 - 25
            </span>
            <span
              className={`age-btn py-16 text-center ${
                activeAge === "26 - 35" ? "active" : ""
              }`}
              onClick={() => handleAgeClick("26 - 35")}
            >
              26 - 35
            </span>
            <span
              className={`age-btn py-16 text-center ${
                activeAge === "36 - 55" ? "active" : ""
              }`}
              onClick={() => handleAgeClick("36 - 55")}
            >
              36 - 55
            </span>
            <span
              className={`age-btn py-16 text-center ${
                activeAge === "55 - 75" ? "active" : ""
              }`}
              onClick={() => handleAgeClick("55 - 75")}
            >
              55 - 75
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeStep;
