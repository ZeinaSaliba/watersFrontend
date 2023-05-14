// import logo from './logo.svg';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LogIn from "./screens/LogIn";
import Skills from "./screens/Skills";
import Result from "./screens/Result";
import Test from "./screens/Test";
import TestResult from "./screens/Test/testResult";
import { BaseSetting } from "./lang/setting";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Signup from "./screens/Signup";

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
        <Route path="/SignUp" element={<Signup/>} />

      </Routes>
    </div>
  );
}

export default App;
