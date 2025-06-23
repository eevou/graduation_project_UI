import React from "react";
import "./Programs.css";
import Header from "../HomePage/Header/Header";
import Footer from "../HomePage/Footer/Footer";
import { useTranslation } from "react-i18next";

const mockTranslations = {
  "note.expatriate_activities": "University Programs & Services",
  "button.learn_more": "Learn More",
  "program.general_admin": "General Administration Program",
  "program.commerce_special": "Special Commerce Program",
  "program.legal_open": "Open Legal Studies",
  "program.blended_arts": "Blended Arts Program",
  "program.medicine_credit": "Medicine Credit Program",
  "program.university_housing": "University Housing Services",
  "program.student_inquiry": "Student Inquiry Center",
  "program.ece_program": "Early Childhood Education",
  "program.centers_excellence": "Centers of Excellence",
  "program.eval_center": "Evaluation Center",
  "program.iso_training": "ISO Training Program",
  "program.engineering_library": "Engineering Library Services",
}

const Programs = () => {
  const savedLang = JSON.parse(localStorage.getItem("lang"));
  const { i18n, t } = useTranslation("Programs");

  const pArStyle = {
    fontFamily: "var(--MNF_Body_AR)",
  };

  const pEnStyle = {
    fontFamily: "var(--MNF_Body_EN)",
  };

  const headArStyle = {
    fontFamily: "var(--MNF_Heading_AR)",
  };

  const headEnStyle = {
    fontFamily: "var(--MNF_Heading_EN)",
  };

  const allPrograms = [
    {
      id: 1,
      program: t("program.general_admin"),
      link: "https://mu.menofia.edu.eg/infor/infoHome/ar",
      icon: "🎓",
      category: "Administration",
    },
    {
      id: 2,
      program: t("program.commerce_special"),
      link: "https://www.menofia.edu.eg/View/12737/ar",
      icon: "💼",
      category: "Commerce",
    },
    {
      id: 3,
      program: t("program.legal_open"),
      link: "https://www.menofia.edu.eg/View/12738/ar",
      icon: "⚖️",
      category: "Legal",
    },
    {
      id: 4,
      program: t("program.blended_arts"),
      link: "https://www.menofia.edu.eg/View/12739/ar",
      icon: "🎨",
      category: "Arts",
    },
    {
      id: 5,
      program: t("program.medicine_credit"),
      link: "https://www.menofia.edu.eg/View/69836/ar",
      icon: "🏥",
      category: "Medicine",
    },
    {
      id: 6,
      program: t("program.university_housing"),
      link: "http://alzahraa.mans.edu.eg/studentApplications",
      icon: "🏠",
      category: "Housing",
    },
    {
      id: 7,
      program: t("program.student_inquiry"),
      link: "https://www.menofia.edu.eg/Students/ar",
      icon: "❓",
      category: "Support",
    },
    {
      id: 8,
      program: t("program.ece_program"),
      link: "https://www.menofia.edu.eg/View/12740/ar",
      icon: "👶",
      category: "Education",
    },
    {
      id: 9,
      program: t("program.centers_excellence"),
      link: "https://www.menofia.edu.eg/View/63344/ar",
      icon: "🌟",
      category: "Excellence",
    },
    {
      id: 10,
      program: t("program.eval_center"),
      link: "http://mu.menofia.edu.eg/CenEv/",
      icon: "📊",
      category: "Evaluation",
    },
    {
      id: 11,
      program: t("program.iso_training"),
      link: "https://www.menofia.edu.eg/View/126087/ar",
      icon: "📋",
      category: "Training",
    },
    {
      id: 12,
      program: t("program.engineering_library"),
      link: "https://www.menofia.edu.eg/View/129655/ar",
      icon: "📚",
      category: "Library",
    },
  ]

  return (
    <div className="programs-container" style={savedLang?.code === `ar` ? headArStyle : headEnStyle}>
      <Header index={3}></Header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-text">University Programs</span>
            </div>
            <h1 className="hero-title" style={savedLang?.code === `ar` ? headArStyle : headEnStyle}>
              {t("note.expatriate_activities")}
            </h1>
            <p className="hero-subtitle" style={savedLang?.code === `ar` ? pArStyle : pEnStyle}>
              Discover our comprehensive range of academic programs and services designed to support your educational
              journey.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">12+</span>
                <span className="stat-label">Programs</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Students</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="programs-section">
        <div className="section-header">
          <h2 className="section-title" style={savedLang?.code === `ar` ? headArStyle : headEnStyle}>
            Available Programs
          </h2>
          <p className="section-description" style={savedLang?.code === `ar` ? pArStyle : pEnStyle}>
            Choose from our diverse selection of programs tailored to meet your academic and professional goals.
          </p>
        </div>

        <div className="programs-grid">
          {allPrograms.map((program, index) => (
            <div className="program-card" key={program.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="card-header">
                <div className="program-icon">{program.icon}</div>
                <span className="program-category">{program.category}</span>
              </div>
              <div className="card-body">
                <h3 className="program-title" style={savedLang?.code === `ar` ? headArStyle : headEnStyle}>
                  {program.program}
                </h3>
              </div>
              <div className="card-footer">
                <a href={program.link} target="_blank" rel="noopener noreferrer" className="program-link">
                  <span>{t("button.learn_more")}</span>
                  <svg className="link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer></Footer>
    </div>
  )
}

export default Programs
