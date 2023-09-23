import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { DocumentData, doc, getDoc } from "firebase/firestore";

const SelectionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [selection, setSelection] = useState<DocumentData | null>(null);

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
      {selection && (
        <div
          className="text-white"
          style={{
            backgroundImage: `url(${selection.img_1})`,
            backgroundSize: "540px 370px", // Ajuste la taille de l'image pour qu'elle couvre la div
            backgroundPosition: "center top", // Centre l'image verticalement et la place en haut horizontalement
            backgroundRepeat: "no-repeat", // Empêche la répétition de l'image de fond
            paddingBottom: "50%",
            position: "relative",
            top: "48px", // Réserve la moitié de la hauteur pour l'image de fond
          }}
        >
          <h2>{selection.title}</h2>
          <p>{selection.description}</p>
        </div>
      )}
    </div>
  );
};

export default SelectionDetails;
