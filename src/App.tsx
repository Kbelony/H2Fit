import "./assets/style.scss";
import InfoSteps from "./components/InfoSteps";
import { LanguageProvider } from "./components/LanguageContext";
import Navbar from "../src/components/Navbar";

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <Navbar></Navbar>
        <InfoSteps />
      </LanguageProvider>
    </div>
  );
}

export default App;
