import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../components/LanguageContext";
// import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { options, fetchData } from "../utils/fetchData";

const Home = () => {
  const { language } = useContext(LanguageContext) || { language: "en" };
  const user = useSelector((state: RootState) => state.user);
  const userName = user.name;
  const [exercicesData, setExercicesData] = useState([]); // État pour stocker les données

  async function fetchExercicesData() {
    try {
      const data = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        options
      );
      setExercicesData(
        data.filter(
          (item: string) => !["cardio", "neck", "waist"].includes(item)
        )
      ); // Mettez à jour l'état avec les données récupérées
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  }

  useEffect(() => {
    fetchExercicesData(); // Appelez la fonction pour récupérer les données lorsque le composant est monté
  }, []);

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
        <div className="flex flex-col items-center justify-center">
          <div className="container md:mt-12 mt-6">
            <div className="grid grid-cols-2 gap-5 bodypart-container">
              {exercicesData.map((bodyPart, index) => (
                <div key={index} className="text-center">
                  <img
                    src={`/src/assets/img/bodyparts/${bodyPart}.png`} // Assurez-vous d'avoir les images correspondantes dans votre répertoire public
                    alt={bodyPart}
                  />
                  <h1 className="text-white">{bodyPart}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="desktop-view"></div>
    </div>
  );
};

export default Home;
