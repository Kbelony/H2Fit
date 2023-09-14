import "./assets/style.scss";
import InfoSteps from "./components/InfoSteps";
import { LanguageProvider } from "./components/LanguageContext";

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <InfoSteps />
      </LanguageProvider>
    </div>
  );
}

export default App;
