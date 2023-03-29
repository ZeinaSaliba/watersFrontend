// The following code imports necessary libraries and modules
import "./styles.css"; // Imports styles from a css file
import { useState } from "react"; // Imports the 'useState' hook from React library
import { useNavigate } from "react-router-dom"; // Imports the 'useNavigate' hook from react-router-dom library
import { t } from "i18next"; // Imports the 't' function from i18next library
import { useTranslation } from "react-i18next"; // Imports the 'useTranslation' hook from react-i18next library

// This is the main component that will be used in the login page
export default function LogIn() {
  // These are state variables initialized with empty strings
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // This is the 'useNavigate' hook called to navigate to different pages, it's assigned to a variable 'navigate'
  const navigate = useNavigate();

  // These are state variables initialized to 'true', and the 'useTranslation' hook is used to get access to the translations set up for the app
  const [languageActive, setLanguageActive] = useState(true);
  const { i18n } = useTranslation();

  // This function changes the language of the app when called
  const button = () => {
    if (languageActive) { // If the current language is English
      i18n.changeLanguage("en"); // Change to French
    } else { // If the current language is not English
      i18n.changeLanguage("fr"); // Change to English
    }
    setLanguageActive(!languageActive); // Toggles the current value of 'languageActive'
  };

  // This function handles the login functionality when called
  const login = () => {
    // A POST request is sent to the login API, and the username and password entered by the user are sent in the request body
    fetch("http://localhost:3003/api/user/login", {
      method: "POST", // The request method is POST
      headers: { // Request headers
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: username, password: password }), // Request body with the entered username and password
    })
      .then((res) => res.json()) // The response is converted to a JSON object
      .then((res) => { 
        // If the login is successful, the logged-in user's information is stored in the local storage of the browser
        localStorage.setItem("logedUser", res?.userinfo?.userName);
        // If the 'data' already exists in the local storage, the current user's information is added to it
        if (localStorage.getItem("data")) { 
          if (
            !JSON.parse(localStorage.getItem("data")).some(
              (el) => el.userName == res?.userinfo?.userName
            )
          ) {
            let data = JSON.parse(localStorage.getItem("data"));
            data = [...data, { userName: res?.userinfo?.userName }];
            localStorage.setItem("data", JSON.stringify(data));
          }
        } else { // If the 'data' doesn't exist in the local storage, a new array is created with the current user's information
          localStorage.setItem(
            "data",
            JSON.stringify([{ userName: res?.userinfo?.userName }])
          );
        }
        if (res?.status == "Success") { // If the login is successful
          navigate("/Skills"); // Navigate to the Skills page
        } else {
          alert(`Please enter valid credentials`); // Otherwise, give an alert message asking the user to enter valid credentials
        }
      })
      .catch((err) => { // If any error occurs, log the error message in the console
        console.log("login screen", err);
      });
  };

  // The following code is for the layout of the login page using HTML and CSS with JSX syntax. It includes input fields for username and password and a button to log in.
  return (
    <div className="container">
      <div className="backgroundContainer">
        <div className="triangle" />
        <div style={{ flexDirection: "row", display:"flex", alignItems:"center" }}>
          <div>
            <h1>Waters Quizz</h1>
          </div>
          <div>
            <label class="switch" style={{marginLeft:"1vw", position:"relative"}}>
              <input type="checkbox" onClick={button} /> {/* Toggles between English and French when clicked */}
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <div className="inputContainer mt-5">
          <input
            type="text"
            className="inputStyle"
            placeholder={t("username")} // Translated placeholder text for username input field
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            className="inputStyle mt-5"
            placeholder={t("password")} // Translated placeholder text for password input field
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="buttonContainer mt-5">
            <button className="login" onClick={login}>
              {t("login")} {/* Translated text for the login button */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
