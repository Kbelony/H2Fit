import { useContext, useState } from "react";
import Logotext from "./assets/img/Logo.svg";
import world from "./assets/img/world.svg";
import { LanguageContext } from "./components/LanguageContext";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

const Navbar = () => {
  const languageContext = useContext(LanguageContext);
  const switchLanguage = languageContext?.switchLanguage || (() => {});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { language } = useContext(LanguageContext) || { language: "en" };
  const userPhoto = useSelector((state: RootState) => state.user.photo);

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
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
            <div className="login">
              {!userPhoto ? (
                <Link to={"/login"}>
                  <p className="text-white pr-4">{login}</p>
                </Link>
              ) : (
                <div className="px-7 img-desktop">
                  <img className="rounded-full w-12" src={userPhoto} alt="" />
                </div>
              )}
            </div>
            <picture
              className="world"
              id="menu-button"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              onClick={toggleDropdown}
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
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
