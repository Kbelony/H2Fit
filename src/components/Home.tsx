import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../components/LanguageContext";
import { Link } from "react-router-dom";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { options, fetchData } from "../utils/fetchData";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Home = () => {
  const { language } = useContext(LanguageContext) || { language: "en" };
  const user = useSelector((state: RootState) => state.user);
  const userName = user.name;
  const [exercicesData, setExercicesData] = useState([]);
  const [postLists, setPostList] = useState<
    {
      title: string;
      author: string;
      img_1: string;
      img_author: string;
      paragraph_1: string;
      paragraph_2: string;
      paragraph_3: string;
      type: string;
    }[]
  >([]);

  const postCollectionRef = collection(db, "articles");

  const getPosts = async () => {
    const data = await getDocs(postCollectionRef);
    setPostList(
      data.docs.map((doc) => ({
        ...doc.data(),
        title: doc.data().title,
        author: doc.data().author,
        img_1: doc.data().img_1,
        img_author: doc.data().img_author,
        paragraph_1: doc.data().paragraph_1,
        paragraph_2: doc.data().paragraph_2,
        paragraph_3: doc.data().paragraph_3,
        type: doc.data().type,
      }))
    );
  };

  useEffect(() => {
    getPosts();
    console.log(postLists);
  }, []);

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
      articles: string;
    };
  }

  const translations: Translations = {
    fr: {
      hi: "Bonjour ",
      foryou: "Pour vous",
      bodylist: "Liste des parties du corps",
      articles: "Quelques articles",
    },
    en: {
      hi: "Hey ",
      foryou: "For you",
      bodylist: "List of body parts",
      articles: "Some articles",
    },
  };

  const translationKey = language || "en";
  const { hi, foryou, bodylist, articles } = translations[translationKey];

  const settingsBody = {
    slidesPerView: 3,
    centeredSlides: false,
    spaceBetween: 1,
    loop: true,
    navigation: true,
  };

  const settingsArticles = {
    slidesPerView: 2,
    centeredSlides: false,
    spaceBetween: 25,
    loop: true,
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
          <div className="container mt-6">
            <div className="text-2xl mb-3 ml-4 text-white">{bodylist}</div>
            <div className="flex bodypart-container">
              <Swiper
                {...settingsBody}
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
          <div className="container mt-1">
            <div className="text-2xl mb-3 ml-4 text-white">{articles}</div>
            <div className="flex articles-container">
              <Swiper
                {...settingsArticles}
                modules={[Navigation]}
                className="swiper-container"
              >
                {postLists.map((articles, index) => (
                  <SwiperSlide key={index}>
                    <div className="" key={index}>
                      <img
                        src={articles.img_1}
                        // Assurez-vous d'avoir les images correspondantes dans votre répertoire public
                        alt={articles.title}
                      />
                      <div className="shadow"></div>
                      <div className="title-div text-sm text-white">
                        <p>{articles.title}</p>
                      </div>
                    </div>
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
