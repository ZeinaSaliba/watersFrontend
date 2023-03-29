import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import { Fragment, useState } from "react";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export default function TestResult(props) {
  const navigate = useNavigate();
  let location = useLocation();

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
  
  const goToNextScreen = () => {
    let data = JSON.parse(localStorage.getItem("data"));
    const logedUser = localStorage.getItem("logedUser");
    data.forEach((user) => {
      if (user.userName == logedUser) {
        if (user.skills) {
          let haveSkill = false;
          user.skills.forEach((skill) => {
            if (skill.skill == location.state.skills) {
              skill.score = location.state.score;
              haveSkill = true;
            }
          });
          if (!haveSkill) {
            user.skills.push({
              skill: location.state.skills,
              score: location.state.score,
            });
          }
        } else {
          user["skills"] = [
            {
              skill: location.state.skills,
              score: location.state.score,
            },
          ];
        }
      }
    });
    localStorage.setItem("data", JSON.stringify(data));
    navigate("/result");
  };

  return (
    <Fragment>
      <Header pageName={location.state.skills} button={button}/>
      <div className="questionTestResultContainer">
        <div className="titleTestResult">{t('test_result')}</div>
        <h1>Waters Quizz</h1>
        <div className="score">
          <FontAwesomeIcon
            icon={faCheckCircle}
            color={"#a5ffc9"}
            style={{ paddingRight: "1vw" }}
          />
          {location.state.score > 50 ? t('great_job') : t('good_effort')} {t('you_scored')}{" "}
          {location.state.score} {t('out_of')} 100.
          {location.state.score < 50 &&
            t('you_can_always...')}
        </div>
        <div className="thanks">
          {t('thanks_for_taking')}
        </div>
        <div className="bottom">
          <div className="congratulation">
            {t('congratulations_text')}
            <FontAwesomeIcon
              icon={faThumbsUp}
              color={"#252525"}
              style={{ paddingLeft: "1vw" }}
            />
          </div>
          <div className="butoncontainer">
            <button className="btn btn-cont" onClick={goToNextScreen}>
              {t('continue')}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
