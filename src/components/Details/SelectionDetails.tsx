import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import back from "../../assets/img/left-arrow.svg";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { LanguageContext } from "../LanguageContext";

const SelectionDetails = () => {
  const history = useNavigate();
  const { language } = useContext(LanguageContext) || { language: "en" };
  const { id } = useParams<{ id: string }>();
  const [selection, setSelection] = useState<DocumentData | null>(null);

  interface Translations {
    [key: string]: {
      hi: string;
      foryou: string;
      bodyParts: string;
      navigate: string;
    };
  }

  const translations: Translations = {
    fr: {
      hi: "Bonjour ",
      foryou: "Pour vous",
      bodyParts: "Objectifs",
      navigate: "Page précédente",
    },
    en: {
      hi: "Hey ",
      foryou: "For you",
      bodyParts: "Objectives",
      navigate: "Previous page",
    },
  };

  const translationKey = language || "en";
  const { navigate, bodyParts } = translations[translationKey];

  useEffect(() => {
    const fetchSelection = async () => {
      if (id) {
        const selectionDoc = await getDoc(doc(db, "selection", id));
        if (selectionDoc.exists()) {
          setSelection(selectionDoc.data());
          console.log(selection);
        } else {
          console.log(`No document found with id: ${id}`);
        }
      }
    };
    fetchSelection();
  }, [id]);

  return (
    <div className="selection-details-components">
      <div className="mobile-view">
        <div
          className="back-button flex ml-3 items-start justify-normal text-white"
          onClick={() => history(-1)}
        >
          <img className="mr-2 mt-1 w-10" src={back} alt="" />
          <p className="text-base mt-3">{navigate}</p>
        </div>
        {selection && (
          <div
            className="text-white"
            style={{
              backgroundImage: `url(${selection.img_1})`,
              backgroundSize: "540px 370px", // Ajuste la taille de l'image pour qu'elle couvre la div
              backgroundPosition: "center top", // Centre l'image verticalement et la place en haut horizontalement
              backgroundRepeat: "no-repeat", // Empêche la répétition de l'image de fond
              paddingBottom: "40%",
              position: "relative",
              top: "17px", // Réserve la moitié de la hauteur pour l'image de fond
            }}
          >
            <div className="shadow"></div>
            <div className="text-paragraph pl-5 pt-7">
              <h2 className="text-4xl mb-3">{selection.title}</h2>
              <p>{selection.description}</p>
              <div className="group-exercices mt-10 flex flex-col">
                <div className="exercice-1 mb-16 flex flex-row">
                  <img src={selection.exo_1_img} alt="" />
                  <div className="type">
                    <img
                      src={`https://raw.githubusercontent.com/Kbelony/H2Fit/main/src/assets/img/bodyparts/${selection.type}.png`}
                      alt=""
                    />
                  </div>
                  <div className="description ml-7 mt-4">
                    <h5 className="capitalize">{selection.exo_1}</h5>
                    <p>
                      {Math.floor(Math.random() * 4) + 2} Sets . {bodyParts} :{" "}
                      {selection.type}{" "}
                    </p>
                  </div>
                </div>
                <div className="exercice-2 mb-16 flex flex-row">
                  <img src={selection.exo_2_img} alt="" />
                  <div className="type">
                    <img
                      src={`https://raw.githubusercontent.com/Kbelony/H2Fit/main/src/assets/img/bodyparts/${selection.type}.png`}
                      alt=""
                    />
                  </div>
                  <div className="description ml-7 mt-4">
                    <h5 className="capitalize">{selection.exo_2}</h5>
                    <p>
                      {Math.floor(Math.random() * 4) + 2} Sets . {bodyParts} :{" "}
                      {selection.type}{" "}
                    </p>
                  </div>
                </div>
                <div className="exercice-3 mb-16 flex flex-row">
                  <img src={selection.exo_3_img} alt="" />
                  <div className="type">
                    <img
                      src={`https://raw.githubusercontent.com/Kbelony/H2Fit/main/src/assets/img/bodyparts/${selection.type}.png`}
                      alt=""
                    />
                  </div>
                  <div className="description ml-7 mt-4">
                    <h5 className="capitalize">{selection.exo_3}</h5>
                    <p>
                      {Math.floor(Math.random() * 4) + 2} Sets . {bodyParts} :{" "}
                      {selection.type}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="desktop-view"></div>
    </div>
  );
};

export default SelectionDetails;
