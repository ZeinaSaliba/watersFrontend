// import logo from './logo.svg';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LogIn from "./screens/LogIn/index";
import Skills from "./screens/Skills";
import Result from "./screens/Result";
import Test from "./screens/Test";
import TestResult from "./screens/Test/testResult";
import { BaseSetting } from "./lang/setting";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: BaseSetting.resourcesLanguage,
  lng: BaseSetting.defaultLanguage,
  fallbackLng: BaseSetting.defaultLanguage,
});

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/Skills" element={<Skills />} />
        <Route path="/Result" element={<Result />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/testresult" element={<TestResult />} />
      </Routes>
    </div>
  );
}

export default App;
