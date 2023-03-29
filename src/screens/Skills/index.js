import { t } from "i18next";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import "./styles.css";

export default function Skills(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);

  const [languageActive, setLanguageActive] = useState(true);
  const { i18n } = useTranslation();

  const button = () => {
    if (languageActive) {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("fr");
    }
    setLanguageActive(!languageActive);
  };

  // This function is called when the user clicks on a skill to start a test.
  const start = (chosen) => {
    // The 'skills' array contains all available skills to be tested.
    // Find the skill that matches the user's choice by its ID.
    let id = skills.find((item) => chosen === item?.id);
    // Navigate to the '/test' route and pass the selected skill ID as a state parameter.
    navigate("/test", { state: { id } });
  };

  useEffect(() => {
    setLoading(true);
    // fetch the skills data from the local API
    fetch("http://localhost:3003/api/skills/all")
      .then((res) => res.json())
      // set loading state to false and update the skills state with the fetched data
      .then((res) => {
        setLoading(false);
        setSkills(res);
      })
      .catch((err) => {
        console.log("skills screen", err);
      });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Fragment>
      <Header pageName={t("choose_a_skills")} button={button} />
      <div className="grid-Container">
        {skills.map((item, key) => (
          <div key={key} className="card grid-item">
            <div className="cardContainer">
              <div>
                <h2>{item?.name}</h2>
              </div>
              <div>
                <button
                  className="button"
                  onClick={() => {
                    start(item?.id);
                  }}
                >
                  {t("start")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
