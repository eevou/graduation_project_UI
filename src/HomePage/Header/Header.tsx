import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import logo from "../../assets/image.png";
import api from "../../Services/api";
import { useTranslation } from 'react-i18next';


const Header = (props) => {
  const { i18n, t } = useTranslation();
  
  const [langActive, setlangActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [language, setLanguage] = useState("EN");

  const languages = [
    { code: "ar", name: "Arabic", id: 1 },
    { code: "en", name: "English", id: 2 },
    { code: "as", name: "Spanish", id: 3 },
  ];

  const navLinks = [
    { name: `Home`, link: "/" },
    { name: `MNF Uni`, link: "news" },
    { name: `Colleges`, link: "/" },
    { name: `Programs`, link: "/" },
    { name: `News`, link: "news" },
    { name: `Contact Us`, link: "/" },
  ];

  const changeAllLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    const savedLang = JSON.parse(localStorage.getItem("lang"));
    if (savedLang) {
      setLanguage(savedLang.code);
    }
  }, []);

  const CallAPI = (lang) => {
    api
      .get(`/News?id=${lang.id}`)
      .then((response) => {
        props.setFilteredNews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching News:", error);
      });
  }

  const changeLanguage = (lang) => {
    setLanguage(lang.code);
    localStorage.setItem("lang", JSON.stringify(lang));
    CallAPI(lang);
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
                <a href={link.link}>{t(`${link.name}`)}</a>
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
                <div key={lang.code} onClick={() => { changeLanguage(lang); changeAllLanguage(lang.code); }}>
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
