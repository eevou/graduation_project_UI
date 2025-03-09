import React from "react";
import "./Header.css";
import { useState } from "react";
import logo from "../../assets/image.png";

const Header = (props) => {
  const [active, setActive] = useState(false);
  const [language, setLanguage] = useState("EN");
  const languages = [
    { code: "EN", name: "English" },
    { code: "AR", name: "Arabic" },
  ];
  const navLinks = [
    { name: "Home", link: "home"},
    { name: "MNF Uni", link: "news"},
    { name: "Colleges", link: "colleges"},
    { name: "Programs", link: "programs"},
    { name: "Contact Us", link: "contact"},
  ];

  const changeLanguage = (lang) => {
    setLanguage(lang.code);
  };

  const dropdownLang = () => {
    setActive(!active);
  };

  return (
    <header className="nav-container">
      <a href="\" className="nav-logo">
        <img src={logo} alt="International Students Affairs office Logo" />
      </a>

      <nav className="nav-links">
        <ul>
          {navLinks.map((link, index) => {
            return (
              <li key={index} className={props.index === index? "active" : ""}>
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

          <div className={active ? "lang-dropdown lang-active" : "lang-dropdown"}>
            {languages.map((lang) => {
              return (
                <div key={lang.code} onClick={() => changeLanguage(lang)}>
                  {lang.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
