import "./assets/style.scss";
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
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </div>
  );
}

export default App;
