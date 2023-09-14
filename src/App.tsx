import "./assets/style.scss";
import AgeStep from "./components/AgeStep";
import { LanguageProvider } from "./components/LanguageContext";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <Navbar />
        <AgeStep />
      </LanguageProvider>
    </div>
  );
}

export default App;
