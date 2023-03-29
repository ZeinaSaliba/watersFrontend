import { t } from "i18next";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import "./styles.css";

export default function Test(props) {
  const [index, setIndex] = useState(0);
  const [test, setTest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState(null);
  const [select, setSelect] = useState({});
  const [skills, setSkills] = useState("");
  let location = useLocation();
  let navigation = useNavigate();
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
    // Get the id and name from location.state.id
    let data = location.state.id;
    let id = data?.id;
    let subject = data?.name;
    // Set the state of skills to the subject
    setSkills(subject);
    // Set the isLoading state as true
    setIsLoading(true);
    // Fetch the data from the specified URL with the given id
    fetch(`http://localhost:3003/api/test/skills/${id}`)
      .then((res) => res.json()) // Convert the response to JSON
      .then((res) => {
        // Set the isLoading state as false and set the test state with received data
        setIsLoading(false);
        setTest(res);
      })
      .catch((err) => {
        // If there's an error, log it to console
        console.log("test screen", err);
      });
  }, []);

  const handleRadioChange = (event) => {
    // Set the selected radio button value
    setSelectedValue(event.target.value);
    // Make a copy of the previous select object
    let prevSelect = { ...select };
    // Create an object for the current question with its value and correct status
    prevSelect[test[index].question] = {
      value: event.target.value,
      correct: test[index].result == event.target.value,
    };
    // Set the state of select with the updated select object
    setSelect({ ...prevSelect });
  };

  const previous = () => {
    // Check if the index is greater than 0.
    if (index > 0) {
      // decrease the index by 1
      setIndex(index - 1);
      // Copy the previous select object using the spread operator
      let prevSelect = { ...select };
      // If the previous question exists, set its selected value as the selectedValue.
      if (index - 1 > 0) {
        setSelectedValue(prevSelect[test[index - 1].question]?.value);
      }
    }
  };


  const next = () => {
    // Check if the current index is less than the length of the test.
    if (index + 1 < test?.length) {
      // Copy the previous select object using the spread operator.
      let prevSelect = { ...select };
      // If the next question exists, set its selected value as the selectedValue.
      if (prevSelect[test[index + 1].question]?.value) {
        setSelectedValue(prevSelect[test[index + 1].question]?.value);
      } else {
        setSelectedValue(null);
      }
      // Update the index state to the next question.
      setIndex(index + 1);
    }
  };
  

  const submit = () => {
    // make a copy of the previous select object.
    let prevSelect = { ...select };
    // Create an object for the current question with its value and correct status
    prevSelect[test[index]?.question] = {
      value: selectedValue,
      correct: test[index]?.result == selectedValue,
    };
    // Filter out only the correct answers and calculate the score based on the number of correct answers.
    let correctValue = Object.values(prevSelect).filter((item) => item.correct);
    let calculation = Math.ceil(correctValue.length * (100 / test.length));
    // Navigate to the test result screen with the calculated score and skill information.
    navigation("/testresult", { state: { score: calculation, skills } });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Fragment>
      <Header pageName={skills} button={button} />
      <div className="containerTest">
        <div className="title">{t("mcq")}</div>
        <>
          <div className="questionContainer">
            <div className="question">
              {index +
                1 +
                ". " +
                (languageActive == true &&
                test[index]?.question_fr != null &&
                test[index]?.question_fr != ""
                  ? test[index]?.question_fr
                  : test[index]?.question)}
            </div>
            <div className="choices">
              {test[index]?.choices?.map((el, key) => (
                <div className="choice" key={key}>
                  <input
                    type="radio"
                    className="selectionBox"
                    checked={
                      selectedValue != null && selectedValue == el?.value
                    }
                    onChange={handleRadioChange}
                    value={el?.value}
                  />
                  <label>{el?.label}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="buttonsContainer">
            <button
              className="btn btn-prev"
              style={{ display: index == 0 ? "none" : "flex" }}
              onClick={previous}
            >
              {t("previous")}
            </button>

            <button
              className="btn btn-next"
              style={{ display: index + 1 != test?.length ? "flex" : "none" }}
              onClick={next}
            >
              {t("next")}
            </button>
            <button className="btn btn-submit" onClick={submit}>
              {t("submit")}
            </button>
          </div>
        </>
      </div>
    </Fragment>
  );
}
