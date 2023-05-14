// The following code imports necessary libraries and modules
import "./styles.css"; // Imports styles from a css file
import { useState } from "react"; // Imports the 'useState' hook from React library
import { useNavigate } from "react-router-dom"; // Imports the 'useNavigate' hook from react-router-dom library
import { t } from "i18next"; // Imports the 't' function from i18next library
import { useTranslation } from "react-i18next"; // Imports the 'useTranslation' hook from react-i18next library
import { postRequest } from "../../commons/api";

// This is the main component that will be used in the login page
export default function Signup() {
  // These are state variables initialized with empty strings
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // This is the 'useNavigate' hook called to navigate to different pages, it's assigned to a variable 'navigate'
  const navigate = useNavigate();

  // These are state variables initialized to 'true', and the 'useTranslation' hook is used to get access to the translations set up for the app
  const [languageActive, setLanguageActive] = useState(true);
  const { i18n } = useTranslation();

  // This function changes the language of the app when called
  const button = () => {
    if (languageActive) {
      // If the current language is English
      i18n.changeLanguage("en"); // Change to French
    } else {
      // If the current language is not English
      i18n.changeLanguage("fr"); // Change to English
    }
    setLanguageActive(!languageActive); // Toggles the current value of 'languageActive'
  };

  const validatePassword = (email) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(email);
  }

  const signup = () => {
    if (!validatePassword(password)) {
      alert(t("invalid_password"));
      return;
    }
    postRequest('user/register', {first_name: name, last_name: lastName, userName: username, password}, (response) => {
      console.log(response);
      navigate("/skills");
    }, (error) => {
      console.log(error);
    });
  };

  // The following code is for the layout of the login page using HTML and CSS with JSX syntax. It includes input fields for username and password and a button to log in.
  return (
    <div className="container">
      <div className="backgroundContainer">
        <div className="triangle" />
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            <h1>Waters Quizz</h1>
          </div>
          <div>
            <label
              class="switch"
              style={{ marginLeft: "1vw", position: "relative" }}
            >
              <input type="checkbox" onClick={button} />{" "}
              {/* Toggles between English and French when clicked */}
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            position: "relative",
            justifyContent: "space-around",
          }}
        >
          <div className="inputContainers mt-5">
            <input
              type="text"
              className="inputStyles"
              placeholder={t("name")} // Translated placeholder text for username input field
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              className="inputStyles mt-5"
              placeholder={t("last_name")} // Translated placeholder text for username input field
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="inputContainers ">
            <input
              id="usrername"
              type="text"
              className="inputStyles mt-5"
              value={username}
              placeholder={t("username")} // Translated placeholder text for username input field
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="password"
              className="inputStyles mt-5"
              placeholder={t("password")} // Translated placeholder text for password input field
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="buttonContainer mt-5">
          <button className="login" onClick={signup}>
            {t("signup")} {/* Translated text for the login button */}
          </button>
        </div>
      </div>
    </div>
  );
}
