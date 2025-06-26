import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/image.png";
import api from "../../Services/api";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../Services/authContext";
import { useNews } from "../../Services/NewsContext";

const Header = (props) => {
  const [langActive, setLangActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [showHeader, setShowHeader] = useState(true);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { user, loading, setUser } = useAuth();
  const { getNews, setLangId } = useNews();
  const { i18n, t } = useTranslation();
  const location = useLocation();

  const langString = localStorage.getItem("lang");
  const savedLang = langString ? JSON.parse(langString) : null;

  const ARstyle = { fontFamily: "var(--MNF_Body_AR)", fontSize: "13px" };
  const ENstyle = { fontFamily: "var(--MNF_Body_EN)" };

  const languages = [
    { code: "ar", name: t("header.Arabic"), id: 1 },
    { code: "en", name: t("header.English"), id: 2 },
    { code: "as", name: t("header.Spanish"), id: 3 },
  ];

  const navLinks = [
    { name: t("header.home"), link: "/" },
    { name: t("header.MNF Uni"), link: "https://www.menofia.edu.eg/Home/ar" },
    { name: t("header.Colleges"), link: "/collage" },
    { name: t("header.Programs"), link: "/programs" },
    { name: t("header.News"), link: "/news" },
    { name: t("header.contact US"), link: "/contactUs" },
  ];

  const changeAllLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  };

  useEffect(() => {
    if (savedLang) {
      setLanguage(savedLang.code);
      changeAllLanguage(savedLang.code);
    }
  }, []);

  const GetNewsById = (lang) => {
    api
      .get(`News/Id?newsId=${location.state?.news.newsId}&langId=${lang.id}`)
      .then((response) => props.setCurrentNews(response.data))
      .catch((error) => console.error("Error fetching News:", error));
  };

  const changeLanguage = (lang) => {
    setLanguage(lang.code);
    localStorage.setItem("lang", JSON.stringify(lang));
    getNews(lang.id);
    setLangId(lang.id);
    if (location.pathname === `/details`) GetNewsById(lang);
  };

  const logout = async () => {
    try {
      await api.post("/Accounts/logout");
      setUser(null);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Show/hide header
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }

    // Show back to top button
    setShowTopBtn(currentScrollY > 300);

    setLastScrollY(currentScrollY);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (loading) return null;

  return (
    <>
      <header className={`new-nav-container ${showHeader ? "show" : "hide"}`}>
        <a href="/" className="nav-logo">
          <img src={logo} alt="Logo" />
        </a>

        <nav
          className={`nav-section ${menuActive ? "nav-open" : ""} ${savedLang?.code === "ar" ? "nav-ar" : "nav-en"
            }`}
        >
          <i className="fa-solid fa-times close-icon" onClick={() => setMenuActive(false)}></i>
          <ul className={`nav-links-list ${savedLang?.code === "ar" ? "rtl" : ""}`}>
            {navLinks.map((link, index) => (
              <li key={index} className={props.index === index ? "active" : ""}>
                <a
                  href={link.link}
                  style={savedLang?.code === "ar" ? ARstyle : ENstyle}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-controls">
          <div className="language-switcher" onClick={() => setLangActive(!langActive)}>
            <i className="fa-solid fa-globe"></i>
            <span>{language.toUpperCase()}</span>
            {langActive && (
              <div className="lang-dropdown">
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang);
                      changeAllLanguage(lang.code);
                      setLangActive(false);
                    }}
                    style={savedLang?.code === "ar" ? ARstyle : ENstyle}
                  >
                    {lang.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {user ? (
            user?.userRole.includes("ADMIN") ? (
              <Link to="/dashboard">
                <button className="login-button">Dashboard</button>
              </Link>
            ) : null
          ) : (
            <Link to="/login">
              <button className="login-button">{t("header.login")}</button>
            </Link>
          )}

          {user && (
            <i className="fa-solid fa-right-from-bracket logout-icon" onClick={logout}></i>
          )}

          <i className="fa-solid fa-bars menu-icon" onClick={() => setMenuActive(true)}></i>
        </div>
      </header>

      {showTopBtn && (
        <button className="back-to-top" onClick={scrollToTop}>
          <i className="fa-solid fa-chevron-up"></i>
        </button>
      )}
    </>
  );
};

export default Header;
