import React from "react";
import "./Header.css";
import { useState } from "react";
import logo from "../../assets/image.png";

const Header = (props) => {
  const [langActive, setlangActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [language, setLanguage] = useState("EN");
  const languages = [
    { code: "EN", name: "English" },
    { code: "AR", name: "Arabic" },
  ];

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "MNF Uni", link: "news" },
    { name: "Colleges", link: "colleges" },
    { name: "Programs", link: "programs" },
    { name: "News", link: "news" },
    { name: "Contact Us", link: "contact" },
  ];

  const changeLanguage = (lang) => {
    setLanguage(lang.code);
  };

  const dropdownLang = () => {
    setlangActive(!langActive);
  };

  const navBarMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <header className="nav-container">
      <a href="\" className="nav-logo">
        <img src={logo} alt="International Students Affairs office Logo" />
      </a>

      <nav className={menuActive ? "nav-links nav-active" : "nav-links"}>
        <i className="fa-solid fa-times close" onClick={navBarMenu}></i>

        <ul>
          {navLinks.map((link, index) => {
            return (
              <li key={index} className={props.index === index ? "active" : ""}>
                <a href={link.link}>{link.name}</a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="nav-icons">
        <i className="fa-solid fa-magnifying-glass"></i>
        <div className="nav-lang-container" onClick={dropdownLang}>
          <i className="fa-solid fa-globe"></i>
          <span>{language}</span>

          <div
            className={
              langActive ? "lang-dropdown lang-active" : "lang-dropdown"
            }
          >
            {languages.map((lang) => {
              return (
                <div key={lang.code} onClick={() => changeLanguage(lang)}>
                  {lang.name}
                </div>
              );
            })}
          </div>
        </div>
        <i className="fa-solid fa-bars menu" onClick={navBarMenu}></i>
      </div>
    </header>
  );
};

export default Header;
