import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./styles.css";
// functional component header
function Header(props) {
  const { pageName, button  } = props;
  

  return (
    <div className="header">
      <h1>{pageName}</h1>
      <label class="switch">
        <input type="checkbox" onClick={button} />
        <span class="slider round"></span>
      </label>
    </div>
  );
}

export default Header;
