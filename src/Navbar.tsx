import { useContext, useState } from "react";
import Logotext from "./assets/img/Logo.svg";
import world from "./assets/img/world.svg";
import { LanguageContext } from "./components/LanguageContext";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "./app/store";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { setSignOutState } from "./features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const languageContext = useContext(LanguageContext);
  const switchLanguage = languageContext?.switchLanguage || (() => {});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenProfil, setIsDropdownOpenProfil] = useState(false);
  const { language } = useContext(LanguageContext) || { language: "en" };
  const user = useSelector((state: RootState) => state.user);
  const userPhoto = user.photo;
  const dispatch = useDispatch();
  const history = useNavigate();

  interface Translations {
    [key: string]: {
      login: string;
    };
  }

  const translations: Translations = {
    fr: {
      login: "Login",
    },
    en: {
      login: "Login",
    },
  };

  const translationKey = language || "en";
  const { login } = translations[translationKey];

  const handleLogout = () => {
    // Ajoutez cette fonction pour gérer la déconnexion
    signOut(auth)
      .then(() => {
        // Déconnectez l'utilisateur de Google et mettez à jour le Redux store si nécessaire
        dispatch(setSignOutState());
        history("/");
      })
      .catch((error) => {
        // Gestion des erreurs
        console.error("Erreur de déconnexion :", error);
      });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleDropdownProfil = () => {
    setIsDropdownOpenProfil(!isDropdownOpenProfil);
  };

  const closeDropdownProfil = () => {
    setIsDropdownOpenProfil(false);
  };

  return (
    <nav>
      <div className="navbar-component mb-16">
        <ul className="nav-list pt-5 pl-9 ">
          <li className="nav-list-item md:flex md:justify-start">
            <Link to={"/"}>
              <picture className="logo">
                <img className="w-15 ml-0 md:ml-20 md:w24" src={Logotext} />
              </picture>
            </Link>
          </li>
          <li className="nav-list-item md:flex md:justify-end">
            {!userPhoto ? (
              <div className="login">
                <Link to={"/login"}>
                  <p className="text-white pr-4">{login}</p>
                </Link>
              </div>
            ) : (
              <div className="px-7 profil-picture">
                <img
                  id="profil-button"
                  aria-expanded={isDropdownOpenProfil}
                  aria-haspopup="true"
                  onClick={() => {
                    toggleDropdownProfil();
                    closeDropdown();
                  }}
                  className="rounded-full w-12"
                  src={userPhoto}
                  alt=""
                />
              </div>
            )}

            <picture
              className="world"
              id="menu-button"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              onClick={() => {
                toggleDropdown();
                closeDropdownProfil();
              }}
            >
              <img className="w-7 mr-8 mt-2" src={world} />
            </picture>
            <div
              className={`translation-dropdown absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                isDropdownOpen ? "" : "hidden"
              }`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1" role="none">
                <a
                  className="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  id="menu-item-1"
                  onClick={() => {
                    switchLanguage("fr");
                    closeDropdown();
                  }}
                >
                  🇫🇷 Français
                </a>
                <hr />
                <a
                  className="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  id="menu-item-2"
                  onClick={() => {
                    switchLanguage("en");
                    closeDropdown();
                  }}
                >
                  🇺🇸 English
                </a>
              </div>
            </div>
            <div
              className={`profil-dropdown absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                isDropdownOpenProfil ? "" : "hidden"
              }`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1" role="none">
                <a
                  className="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  id="menu-item-1"
                  onClick={() => {
                    closeDropdownProfil();
                  }}
                >
                  Profile
                </a>
                <hr />
                <a
                  className="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  id="menu-item-2"
                  onClick={() => {
                    handleLogout(); // Appel de la fonction de déconnexion
                    closeDropdownProfil();
                  }}
                >
                  Déconnexion
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
