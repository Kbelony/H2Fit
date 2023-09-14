import { useContext, useState } from "react";
import { LanguageContext } from "../LanguageContext";

const RegisterStep = () => {
  const { language } = useContext(LanguageContext) || { language: "en" };

  interface Translations {
    [key: string]: {
      starting: string;
      firstname: string;
      name: string;
      password: string;
      confirmPassword: string;
      submit: string;
    };
  }

  const translations: Translations = {
    fr: {
      starting:
        "Pour commencer a vous créer un programme ils nous faudrait quelques informations",
      firstname: "Prénom",
      name: "Nom",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      submit: "S'inscire",
    },
    en: {
      starting:
        "To start creating a program for you we would need some information",
      firstname: "First name",
      name: "Name",
      password: "Password",
      confirmPassword: "Confirm password",
      submit: "Submit",
    },
  };

  const translationKey = language || "en";
  const { starting, firstname, name, password, confirmPassword, submit } =
    translations[translationKey];
  const [formData, setFormData] = useState({
    firstname: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event: {
    target: { name: unknown; value: unknown };
  }) => {
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
      <div className="flex flex-col items-center justify-center">
        <h5 className="text-white text-base text-center p-7 pb-0">
          {starting}
        </h5>
        <div className="container md:mt-12 mt-8">
          <div className="flex flex-col justify-start">
            <div className="register-form ml-8">
              <form onSubmit={handleSubmit}>
                <label htmlFor="firstname">{firstname}:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mb-6 flex flex-col"
                />

                <label htmlFor="name">{name}:</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="mb-6 flex flex-col"
                />

                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mb-6 flex flex-col"
                />

                <label htmlFor="name">{password}:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mb-6 flex flex-col"
                />

                <label htmlFor="name">{confirmPassword}:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mb-6 flex flex-col"
                />

                <button
                  className="text-white py-4 px-6 submit-btn"
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
  );
};

export default RegisterStep;
