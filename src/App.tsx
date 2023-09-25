import "./assets/style.scss";
import BodyDetails from "./components/Details/BodyDetails";
import ExcerciceDetails from "./components/Details/ExcerciceDetails";

import SelectionDetails from "./components/Details/SelectionDetails";
import Home from "./components/Home";
import Homepage from "./components/Homepage";
import InfoSteps from "./components/InfoSteps";
import { LanguageProvider } from "./components/LanguageContext";
import Login from "./components/Login";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/step" element={<InfoSteps />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/:id/" element={<BodyDetails />} />
            <Route path="/exercice/:id/" element={<ExcerciceDetails />} />
            <Route path="/selection/:id/" element={<SelectionDetails />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </div>
  );
}

export default App;
