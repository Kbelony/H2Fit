import { useContext, useState } from "react";
import { LanguageContext } from "../LanguageContext";
import bar from "../../assets/img/bar.svg";
import apple from "../../assets/img/apple.svg";
import google from "../../assets/img/google.svg";
import twitter from "../../assets/img/twitter.svg";

const RegisterStep = () => {
  const { language } = useContext(LanguageContext) || { language: "en" };

  interface Translations {
    [key: string]: {
      firstname: string;
      name: string;
      password: string;
      email: string;
      confirmPassword: string;
      submit: string;
    };
  }

  const translations: Translations = {
    fr: {
      firstname: "Prénom",
      name: "Nom",
      password: "Mot de passe",
      email: "Entrer votre email ...",
      confirmPassword: "Confirmer le mot de passe",
      submit: "S'inscire",
    },
    en: {
      firstname: "First name",
      name: "Name",
      email: "Enter your email ...",
      password: "Password",
      confirmPassword: "Confirm password",
      submit: "Submit",
    },
  };

  const translationKey = language || "en";
  const { firstname, name, password, email, confirmPassword, submit } =
    translations[translationKey];
  const [formData, setFormData] = useState({
    firstname: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    alert(
      `Name: ${formData.name},FirstName: ${formData.firstname}, Email: ${formData.email},Password: ${formData.password},ConfirmPassword: ${formData.confirmPassword}`
    );
  };

  return (
    <div className="register-step-component">
      <div className="flex flex-col items-start justify-start">
        <div className="container md:mt-12 mt-8">
          <div className="flex flex-col justify-start mr-10">
            <div className="register-form ml-8">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mb-6 flex flex-col"
                  placeholder={firstname}
                />

                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="mb-6 flex flex-col"
                  placeholder={name}
                />

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

                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mb-6 flex flex-col"
                  placeholder={confirmPassword}
                />

                <button
                  className="text-white py-3 px-6 submit-btn"
                  type="submit"
                >
                  {submit}
                </button>
              </form>
              <img className="bar mt-5 w-full" src={bar} alt="" />
              <div className="group-social mt-7 flex flex-row justify-center">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterStep;
