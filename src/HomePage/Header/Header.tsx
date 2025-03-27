import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import logo from "../../assets/image.png";
import api from "../../Services/api";
import { useTranslation } from "react-i18next";

const Header = (props) => {
  const ARstyle = {
    fontFamily: "var(--MNF_Body_AR)",
    fontSize: "14px",
  };
  
  const ENstyle = {
    fontFamily: "var(--MNF_Body_EN)",
    fontSize: "13px",
  };
  
  const savedLang = JSON.parse(localStorage.getItem("lang"));

  const { i18n, t } = useTranslation();

  const [langActive, setlangActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [language, setLanguage] = useState("EN");

  const languages = [
    { code: "ar", name: t("header.Arabic"), id: 1 },
    { code: "en", name: t("header.English"), id: 2 },
    { code: "as", name: t("header.Spanish"), id: 3 },
  ];

  const navLinks = [
    { name: t("header.home"), link: "/" },
    { name: t("header.MNF Uni"), link: "/" },
    { name: t("header.Colleges"), link: "/" },
    { name: t("header.Programs"), link: "/" },
    { name: t("header.News"), link: "/news" },
    { name: t("header.contact US"), link: "/" },
  ];

  const changeAllLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  };

  useEffect(() => {
    if (savedLang) {
      setLanguage(savedLang.code);
      changeAllLanguage(savedLang.code);
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
  };

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
                <a
                  href={link.link}
                  style={savedLang?.code === `ar` ? ARstyle : ENstyle}
                >
                  {t(`${link.name}`)}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="nav-icons">
        <i className="fa-solid fa-magnifying-glass"></i>
        <div className="nav-lang-container" onClick={dropdownLang}>
          <i className="fa-solid fa-globe"></i>
          <span>{language.toUpperCase()}</span>

          <div
            className={
              langActive ? "lang-dropdown lang-active" : "lang-dropdown"
            }
          >
            {languages.map((lang) => {
              return (
                <div
                  style={savedLang?.code === `ar` ? ARstyle : ENstyle}
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang);
                    changeAllLanguage(lang.code);
                  }}
                >
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
