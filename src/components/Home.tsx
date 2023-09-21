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
import close from "../assets/img/close-btn.svg";

const Home = () => {
  const { language } = useContext(LanguageContext) || { language: "en" };
  const user = useSelector((state: RootState) => state.user);
  const userName = user.name;
  const [exercicesData, setExercicesData] = useState([]);
  const [showMore, setShowMore] = useState(false);
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
  const [selectedArticle, setSelectedArticle] = useState<{
    title: string;
    author: string;
    img_1: string;
    img_author: string;
    paragraph_1: string;
    paragraph_2: string;
    paragraph_3: string;
    type: string;
  } | null>(null);

  console.log(selectedArticle);

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
      bodylist: "Choisissez une partie a travailler :",
      articles: "Quelques articles :",
    },
    en: {
      hi: "Hey ",
      foryou: "For you",
      bodylist: "Choose a part to work on : ",
      articles: "Some articles :",
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
                {postLists.map((article, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className=""
                      key={index}
                      onClick={() => setSelectedArticle(article)}
                    >
                      <img src={article.img_1} alt={article.title} />
                      <div className="shadow"></div>
                      <div className="title-div text-sm text-white">
                        <p>{article.title}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              {selectedArticle && (
                <div
                  className="mini-page text-white "
                  style={{
                    backgroundImage: `url(${selectedArticle.img_1})`,
                    backgroundSize: "560px 370px", // Ajuste la taille de l'image pour qu'elle couvre la div
                    backgroundPosition: "center top", // Centre l'image verticalement et la place en haut horizontalement
                    backgroundRepeat: "no-repeat", // Empêche la répétition de l'image de fond
                    paddingBottom: "50%", // Réserve la moitié de la hauteur pour l'image de fond
                  }}
                >
                  <img
                    className="w-12 ml-4 mt-4"
                    onClick={() => {
                      setSelectedArticle(null);
                      setShowMore(false);
                    }}
                    src={close}
                    alt=""
                  />

                  <div className="paragraph px-5 mb-5">
                    <p className="by mt-48 mb-4 pt-6">
                      by {selectedArticle.author}
                    </p>
                    <h2 className="text-3xl mb-6">{selectedArticle.title}</h2>
                    <p className="mb-4">
                      {showMore
                        ? selectedArticle.paragraph_1
                        : selectedArticle.paragraph_1.slice(0, 240) +
                          "..."}{" "}
                      <a
                        className="ml-4"
                        onClick={() => setShowMore(!showMore)}
                      >
                        {" "}
                        More
                      </a>
                    </p>
                    {showMore && (
                      <>
                        <p className="mb-4">{selectedArticle.paragraph_2}</p>
                        <p className="mb-4">{selectedArticle.paragraph_3}</p>
                      </>
                    )}
                    <div className="mt-8 mb-16">
                      <Link to={`/home/${selectedArticle.type}`}>
                        <span className="px-16 ml-10 py-4">
                          Start workout {selectedArticle.type}
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="shadow-articles"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="desktop-view"></div>
    </div>
  );
};

export default Home;
