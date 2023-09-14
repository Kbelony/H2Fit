import AgeStep from "./AgeStep";
import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "./LanguageContext";
import LevelStep from "./LevelStep";

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
    // Save step to local storage
    localStorage.setItem("step", String(step + 1));
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      // Save step to local storage
      localStorage.setItem("step", String(step - 1));
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <AgeStep />;
      case 2:
        return <LevelStep />;
      default:
        return null;
    }
  };

  const getProgressBarWidth = () => {
    return (step / 2) * 100 + "%";
  };

  return (
    <div className="info-steps-component">
      <div className="progress-container md:mt-4 mt-8">
        <div
          className="progress-bar"
          style={{ width: getProgressBarWidth() }}
        />
      </div>
      {renderStep()}
      {step > 1 && (
        <div
          className="back-btn text-center py-4 px-6 mt-12"
          onClick={handleBack}
        >
          <span className="text-white uppercase">{back}</span>
        </div>
      )}
      {step === 1 && (
        <div
          className="next-btn text-center py-4 px-6 mt-12"
          onClick={handleNext}
        >
          <span className="text-white uppercase">{next}</span>
        </div>
      )}
    </div>
  );
};

export default InfoSteps;
