import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../components/LanguageContext";
import { Link } from "react-router-dom";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { options, fetchData } from "../utils/fetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

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
      bodylist: string;
    };
  }

  const translations: Translations = {
    fr: {
      hi: "Bonjour ",
      foryou: "Pour vous",
      bodylist: "Liste des parties du corps",
    },
    en: {
      hi: "Hey ",
      foryou: "For you",
      bodylist: "List of body parts",
    },
  };

  const translationKey = language || "en";
  const { hi, foryou, bodylist } = translations[translationKey];

  const settings = {
    slidesPerView: 3,
    centeredSlides: false,
    spaceBetween: 1,
    loop: false,
    navigation: true,
  };

  return (
    <div className="home-component ">
      <div className="mobile-view mt-24">
        <div className="for-you-text text-2xl ml-4 text-white">
          <div className="hi-text">
            {hi}
            {userName} 👋
          </div>
          {foryou}
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="container md:mt-12 mt-6">
            <div className="text-2xl mb-3 ml-4 text-white">{bodylist}</div>
            <div className="flex bodypart-container">
              <Swiper
                {...settings}
                modules={[Navigation]}
                className="swiper-container"
              >
                {exercicesData.map((bodyPart, index) => (
                  <SwiperSlide key={index}>
                    <Link to={`/home/${bodyPart}`}>
                      <div className="mb-5" key={index}>
                        <img
                          src={`https://raw.githubusercontent.com/Kbelony/H2Fit/main/src/assets/img/bodyparts/${bodyPart}.png`}
                          // Assurez-vous d'avoir les images correspondantes dans votre répertoire public
                          alt={bodyPart}
                        />
                        <p className="text-white text-base">{bodyPart}</p>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      <div className="desktop-view"></div>
    </div>
  );
};

export default Home;
