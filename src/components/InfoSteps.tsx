import AgeStep from "./Steps/AgeStep";
import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "./LanguageContext";
import LevelStep from "./Steps/LevelStep";
import DaysStep from "./Steps/DaysStep";
import RegisterStep from "./Steps/RegisterStep";

const InfoSteps = () => {
  const { language } = useContext(LanguageContext) || { language: "en" };

  interface Translations {
    [key: string]: {
      next: string;
      back: string;
    };
  }

  const translations: Translations = {
    fr: {
      next: "Suivant",
      back: "Retour",
    },
    en: {
      next: "Next",
      back: "Back",
    },
  };

  const translationKey = language || "en";
  const { next, back } = translations[translationKey];
  const [step, setStep] = useState(1);

  // Retrieve step from local storage on component mount
  useEffect(() => {
    const savedStep = localStorage.getItem("step");
    if (savedStep) {
      setStep(parseInt(savedStep, 10));
    }
  }, []);

  const handleNext = () => {
    setStep(step + 1);
    localStorage.setItem("step", String(step + 1));
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      localStorage.setItem("step", String(step - 1));
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <AgeStep />;
      case 2:
        return <LevelStep />;
      case 3:
        return <DaysStep />; // Render the DaysStep component as the third step
      case 4:
        return <RegisterStep />;
      default:
        return null;
    }
  };

  const getProgressBarWidth = () => {
    return ((step - 1) / 3) * 100 + "%"; // Adjusted for the third step
  };

  return (
    <div className="info-steps-component">
      <div className="progress-container mt-8 ">
        <div
          className="progress-bar"
          style={{ width: getProgressBarWidth() }}
        />
      </div>
      {renderStep()}
      <div className="flex justify-between">
        {step > 1 && (
          <div
            className="back-btn text-center py-4 px-6 mr-12 mt-12"
            onClick={handleBack}
          >
            <span className="text-white uppercase">{back}</span>
          </div>
        )}
        {step !== 4 && (
          <div
            className="next-btn text-center py-4 px-6 mt-12"
            onClick={handleNext}
          >
            <span className="text-white uppercase">{next}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoSteps;
