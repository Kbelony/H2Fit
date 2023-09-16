import { useContext, useState } from "react";
import { LanguageContext } from "./LanguageContext";
import bar from "../assets/img/bar.svg";
import apple from "../assets/img/apple.svg";
import google from "../assets/img/Google.svg";
import twitter from "../assets/img/Twitter.svg";

const Login = () => {
  const { language } = useContext(LanguageContext) || { language: "en" };

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
      submit: "S'inscire",
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
                  <div className="google-btn social-btn mr-4 py-3 px-10">
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
      <div className="desktop-view"></div>
    </div>
  );
};

export default Login;