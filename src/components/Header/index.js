import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./styles.css";
// functional component header
function Header(props) {
  const { pageName, button  } = props;
  

  return (
    <div className="header">
      <h1>{pageName}</h1>
      {/* <div
        style={{
          background: "#a5a5a5",
          borderRadius: "5vh",
          height: "5vh",
          width: "5vw",
          display:"flex",
          alignItems:"center",
        }}
      >
        <button
          style={{
            background: "white",
            borderRadius: "5vh",
            height: "4vh",
            width: "2vw",
            cursor: "pointer",
          }}
          onClick={()=>{button()}}
        ></button>
      </div> */}
      <label class="switch">
        <input type="checkbox" onClick={button} />
        <span class="slider round"></span>
      </label>
    </div>
  );
}

export default Header;
