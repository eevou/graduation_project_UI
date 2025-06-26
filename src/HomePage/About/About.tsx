import React from "react";
import logo from "../../assets/image2.png";
import "./About.css";
import { useTranslation } from "react-i18next";

const About = () => {
  const savedLang = JSON.parse(localStorage.getItem("lang"));
  const { t } = useTranslation();

  const langCode = savedLang?.code || "en";
  const isArabic = langCode === "ar";

  const headStyle = {
    fontFamily: isArabic ? "var(--MNF_Heading_AR)" : "var(--MNF_Heading_EN)",
  };

  const pStyle = {
    fontFamily: isArabic ? "var(--MNF_Body_AR)" : "var(--MNF_Body_EN)",
  };

  return (
    <div className="about-wrapper">
      {/* SVG Background */}
      <div className="about-background-svg">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#d6e9f4"
            fillOpacity="1"
            d="M0,224L48,208C96,192,192,160,288,144C384,128,480,128,576,138.7C672,149,768,171,864,176C960,181,1056,171,1152,154.7C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="about-box fade-in">
        <h1 style={headStyle}>{t("about.title")}</h1>

        <img src={logo} alt="logo" className="about-logo" />

        <p style={pStyle}>{t("about.subtitle")}</p>
      </div>
    </div>
  );
};

export default About;
