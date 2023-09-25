import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../LanguageContext";
import { Link, useNavigate } from "react-router-dom";
import { options, fetchData } from "../../utils/fetchData";
import back from "../../assets/img/left-arrow.svg";
import plus from "../../assets/img/Plus.svg";

const BodyDetails = () => {
  const { language } = useContext(LanguageContext) || { language: "en" };
  const history = useNavigate();
  const [exercicesData, setExercicesData] = useState<
    { name: string; gifUrl: string }[]
  >([]);
  const url = window.location.href;
  const segments = url.split("/");
  const bodyPartURL = segments[segments.indexOf("home") + 1];
  async function fetchExercicesData() {
    try {
      const data = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPartURL}`,
        options
      );
      console.log(data);
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
      bodylist: string;
      navigate: string;
    };
  }

  const translations: Translations = {
    fr: {
      hi: "Bonjour ",
      foryou: "Pour vous",
      bodylist: "Liste d'exercices",
      navigate: "Page précédente",
    },
    en: {
      hi: "Hey ",
      foryou: "For you",
      bodylist: "Exercise list",
      navigate: "Previous page",
    },
  };

  const translationKey = language || "en";
  const { bodylist, navigate } = translations[translationKey];

  return (
    <div className="exercice-list-component ">
      <div className="mobile-view mt-24">
        <div className="flex flex-col">
          <div
            className="back-button flex ml-3 items-start justify-normal text-white"
            onClick={() => history(-1)}
          >
            <img className="mr-2 mt-1 w-10" src={back} alt="" />
            <p className="text-base mt-3">{navigate}</p>
          </div>
          <div className="container md:mt-12 mt-6">
            <div className="text-2xl mb-6 ml-4 text-white">
              {bodylist}
              &nbsp;{bodyPartURL}
            </div>
            <div className="flex flex-col bodypart-container">
              {exercicesData.slice(0, 24).map((bodyPart, index) => (
                <Link to={`/exercice/${bodyPart.name}`}>
                  <div className="flex flex-row mb-6" key={index}>
                    <img
                      src={bodyPart.gifUrl}
                      // Assurez-vous d'avoir les images correspondantes dans votre répertoire public
                    />
                    <p
                      className="text-white ml-8 mt-8 mr-20 text-lg"
                      style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {bodyPart.name}
                    </p>
                    <img className="plus" src={plus} alt="" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="desktop-view"></div>
    </div>
  );
};

export default BodyDetails;
