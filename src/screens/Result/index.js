import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import "./styles.css";
import { Fragment, useEffect, useState } from "react";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export default function Result() {
  const navigate = useNavigate();
  const [cardItem, setCardItem] = useState([]);

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

  useEffect(() => {
    let user = localStorage.getItem("logedUser");
    let data = localStorage.getItem("data");
    data = JSON.parse(data);
    data.forEach(element => {
      if(element.userName == user){
        data = element.skills;
        return;
      }
    });
    setCardItem(data);
  }, []);
  
  return (
    <Fragment>
      <Header pageName={t('result')} button={button} />
      <div className="grid-Container">
        {cardItem.map((item, key) => {
          let note = item?.score >= 50;
          return (
            <div
              key={key}
              className="cardResult grid-item"
              style={{
                backgroundColor: note ? "#b6ffd3" : "#4e4e4e",
                color: note ? "black" : "white",
                border: note ? "4px solid #a5ffc9" : "4px solid #252525",
              }}
            >
              <div className="containerNote">
                <div>
                  <h2>{item?.skill}</h2>
                </div>
                <div
                  style={{
                    backgroundColor: note ? "#252525" : "#d9d9d9",
                    color: note ? "white" : "black",
                    fontWeight: "bold",
                  }}
                  className="note"
                >
                  <p>{item?.score}/100</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="buttonContinue">
          <button
            className="btn btn-continue"
            onClick={() => {
              navigate("/Skills");
            }}
          >
            {t('continue')}
          </button>
        </div>
      </div>
    </Fragment>
  );
}
