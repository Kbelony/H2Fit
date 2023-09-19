import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "./LanguageContext";
import bar from "../assets/img/bar.svg";
import apple from "../assets/img/apple.svg";
import google from "../assets/img/Google.svg";
import twitter from "../assets/img/Twitter.svg";
import pexels from "../assets/img/pexels.jpeg";
import { auth, provider } from "../firebase";
import { User, signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUserLoginDetails } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { language } = useContext(LanguageContext) || { language: "en" };
  const dispatch = useDispatch();
  const history = useNavigate();
  const user = useSelector(selectUser);

  interface Translations {
    [key: string]: {
      welcome: string;
      details: string;
      password: string;
      email: string;
      submit: string;
    };
  }

  const translations: Translations = {
    fr: {
      welcome: "Bienvenue !",
      details: "Veuillez entrer vos coordonnées pour vous connecter.",
      password: "Mot de passe",
      email: "Entrer votre email ...",
      submit: "S'inscrire",
    },
    en: {
      welcome: "Welcome back !",
      details: "Please enter your details to sign in.",
      email: "Enter your email ...",
      password: "Password",
      submit: "Submit",
    },
  };

  const translationKey = language || "en";
  const { welcome, details, password, email, submit } =
    translations[translationKey];
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    alert(`Email: ${formData.email},Password: ${formData.password}`);
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider).then((result) => {
        setUser(result.user);
        console.log(result.user);
        history("/home");
      });

      // Vous pouvez maintenant stocker des informations supplémentaires dans MongoDB
    } catch (error) {
      // Gestion des erreurs
      console.error(error);
    }
  };

  useEffect(() => {
    if (!user) {
      history("/home");
    } else {
      console.log(user);
    }
  }, [user, history]);

  const setUser = (user: User) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );

    // Vérifier si user.photoURL n'est pas null avant de le stocker
    if (user.photoURL) {
      localStorage.setItem("userPhoto", user.photoURL);
      localStorage.setItem("userName", user.displayName || "");
    }
  };

  useEffect(() => {
    const storedUserPhoto = localStorage.getItem("userPhoto");
    const storedUserName = localStorage.getItem("userName");
    if (storedUserPhoto) {
      // Mettre à jour le Redux store avec les informations de l'utilisateur
      dispatch(
        setUserLoginDetails({
          name: storedUserName,
          email: user.email,
          photo: storedUserPhoto,
        })
      );
    }
  }, [dispatch]);

  return (
    <div className="login-component">
      <div className="mobile-view">
        <div className="flex flex-col items-start justify-start">
          <div className="container md:mt-12 mt-8">
            <div className="flex flex-col justify-start mr-10">
              <div className="login-form ml-8">
                <div className="text">
                  <h5 className="text-white text-xl text-center p-7 pb-0">
                    {welcome}
                  </h5>
                  <h5 className="text-white details text-center text-base">
                    {details}
                  </h5>
                </div>
                <div className="group-social mt-10 flex flex-row justify-center">
                  <div className="apple-btn social-btn mr-4 py-3 px-10">
                    <img src={apple} alt="" />
                  </div>
                  <div
                    className="google-btn social-btn mr-4 py-3 px-10"
                    onClick={signInWithGoogle}
                  >
                    <img src={google} alt="" />
                  </div>
                  <div className="twitter-btn social-btn py-3 px-10">
                    <img src={twitter} alt="" />
                  </div>
                </div>
                <img className="bar mt-5 mb-10 w-full" src={bar} alt="" />
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mb-6 flex flex-col"
                    placeholder={email}
                  />

                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mb-6 flex flex-col"
                    placeholder={password}
                  />

                  <button
                    className="text-white py-3 px-6 submit-btn"
                    type="submit"
                  >
                    {submit}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="desktop-view">
        <div className="flex flex-grow justify-between">
          <div className="flex ml-60 mt-16 flex-col items-start justify-start">
            <div className="container md:mt-12 mt-8">
              <div className="flex flex-col justify-start mr-10">
                <div className="login-form ml-8">
                  <div className="text">
                    <h5 className="text-white text-xl text-center p-7 pb-0">
                      {welcome}
                    </h5>
                    <h5 className="text-white details text-center text-base">
                      {details}
                    </h5>
                  </div>
                  <div className="group-social mt-10 flex flex-row justify-center">
                    <div className="apple-btn disabled social-btn mr-4 py-3 px-10">
                      <img src={apple} alt="" />
                    </div>
                    <div
                      className="google-btn social-btn mr-4 py-3 px-10"
                      onClick={signInWithGoogle}
                    >
                      <img src={google} alt="" />
                    </div>
                    <div className="twitter-btn social-btn py-3 px-10">
                      <img src={twitter} alt="" />
                    </div>
                  </div>
                  <img className="bar mt-5 mb-10 w-full" src={bar} alt="" />
                  <form onSubmit={handleSubmit}>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mb-6 flex flex-col"
                      placeholder={email}
                    />

                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="mb-6 flex flex-col"
                      placeholder={password}
                    />

                    <button
                      className="text-white py-3 px-6 submit-btn"
                      type="submit"
                    >
                      {submit}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-4 right-img flex-col">
            <img src={pexels} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
