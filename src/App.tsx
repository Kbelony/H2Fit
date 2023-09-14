import "./assets/style.scss";
import InfoSteps from "./components/InfoSteps";
import { LanguageProvider } from "./components/LanguageContext";
import Navbar from "./Navbar";

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <Navbar />
        <InfoSteps />
      </LanguageProvider>
    </div>
  );
}

export default App;
