"use client"

import { useState, useEffect } from "react"
import "./Collages.css"
import Header from "../HomePage/Header/Header"
import Footer from "../HomePage/Footer/Footer"
import { useTranslation } from "react-i18next"

const Sector = () => {
  const savedLang = JSON.parse(localStorage.getItem("lang"))
  const { i18n, t } = useTranslation("College")

  const defaultSectors = [
    {
      id: "academic",
      title: t("academic-sector"),
      icon: "🎓",
      description: t("academic-sector-desc"),
      detailText: t("academic-sector-about"),
      Colleges: [
        { name: t("art"), link: "https://www.menofia.edu.eg/ENG/Home/ar" },
        { name: t("science"), link: "https://www.menofia.edu.eg/FEE/Home/ar" },
        { name: t("education"), link: "https://www.menofia.edu.eg/fci/Home/ar" },
        { name: t("business"), link: "https://mu.menofia.edu.eg/ai/Home/ar" },
      ],
    },
    {
      id: "research",
      title: t("Research Sector"),
      icon: "🔬",
      description: t("Scientific research and technological development centers"),
      detailText: t("Research Description"),
      Colleges: [
        { name: t("Graduate Studies"), link: "https://www.menofia.edu.eg/SCI/Home/ar" },
        { name: t("Scientific Research"), link: "https://www.menofia.edu.eg/AGR/Home/ar" },
      ],
    },
    {
      id: "medical",
      title: t("medical sector"),
      icon: "🏥",
      description: t("Medical colleges and teaching hospitals"),
      detailText: t("Medical Description"),
      Colleges: [
        { name: t("Medicine"), link: "https://www.menofia.edu.eg/MED/Home/ar" },
        { name: t("Dentistry"), link: "https://mu.menofia.edu.eg/dent/Home/ar" },
        { name: t("Pharmacy"), link: "http://mu.menofia.edu.eg/pharm/Home/ar" },
        { name: t("Nursing"), link: "https://www.menofia.edu.eg/NUR/Home/ar" },
        { name: t("Bitary"), link: "https://mu.menofia.edu.eg/vmed/Home/ar" },
        { name: t("MahadTamrid"), link: "https://mu.menofia.edu.eg/NCI/SectorsHome/ar" },
      ],
    },
    {
      id: "technical",
      title: t("Technical sector"),
      icon: "💻",
      description: t("Computer and e-learning laboratories"),
      detailText: t("Technical Description"),
      Colleges: [
        { name: t("Computer Science"), link: "https://www.menofia.edu.eg/EDU/Home/ar" },
        { name: t("Engineering"), link: "https://www.menofia.edu.eg/EDV/Home/ar" },
        { name: t("Information Technology"), link: "https://mu.menofia.edu.eg/fpe/Home/ar" },
        { name: t("Applied Sciences"), link: "http://mu.menofia.edu.eg/media/Home/ar" },
        { name: t("Tigara"), link: "https://www.menofia.edu.eg/COM/Home/ar" },
        { name: t("Ealam"), link: "https://www.menofia.edu.eg/ART/Home/ar" },
        { name: t("Hoqoq"), link: "https://www.menofia.edu.eg/LAW/Home/ar" },
      ],
    },
  ]

  const pArStyle = {
    fontFamily: "var(--MNF_Body_AR)",
  }

  const pEnStyle = {
    fontFamily: "var(--MNF_Body_EN)",
  }

  const headArStyle = {
    fontFamily: "var(--MNF_Heading_AR)",
  }

  const headEnStyle = {
    fontFamily: "var(--MNF_Heading_EN)",
  }

  const [mounted, setMounted] = useState(false)
  const [expandedSector, setExpandedSector] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleSector = (sectorId: string) => {
    if (expandedSector === sectorId) {
      setExpandedSector(null)
    } else {
      setExpandedSector(sectorId)
    }
  }

  return (
    <div className="page-container">
      <Header index={2}></Header>

      {/* Hero Section with Classification */}
      <div
        className="hero-container"
        style={{
          backgroundImage: "url(https://i.pinimg.com/736x/6a/d4/df/6ad4df6cc3a3734cc7776f05e9f9ee39.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="hero-image"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-title-section">
            <div className="hero-icon">🎓</div>
            <h1 className="hero-main-title" style={savedLang?.code === `ar` ? headArStyle : headEnStyle}>
              {savedLang?.code === `ar` ? "كلياتنا" : "Our Faculties"}
            </h1>
          </div>
          <div
            className={
              savedLang?.code === `ar`
                ? "classification-box ar-classification-box"
                : "classification-box en-classification-box"
            }
          >
            <h2 className="classification-title" style={savedLang?.code === `ar` ? headArStyle : headEnStyle}>
              {t("classification")}
            </h2>
            <p className="classification-text" style={savedLang?.code === `ar` ? pArStyle : pEnStyle}>
              {t("classification-desc")}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-container">
          <div className="stats-icon">🏆</div>
          <div className="title-container">
            <div className="title-header">
              <h1 className="title-text" style={savedLang?.code === `ar` ? headArStyle : headEnStyle}>
                {t("20")}
              </h1>
              <div className="title-count" style={savedLang?.code === `ar` ? pArStyle : pEnStyle}>
                {t("college-number")}
              </div>
            </div>
            <p className="title-description" style={savedLang?.code === `ar` ? pArStyle : pEnStyle}>
              {t("college-number-desc")}
            </p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="quick-stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🎓</div>
            <div className="stat-number">4</div>
            <div className="stat-label" style={savedLang?.code === `ar` ? pArStyle : pEnStyle}>
              {savedLang?.code === `ar` ? "أقسام أكاديمية" : "Academic Sectors"}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔬</div>
            <div className="stat-number">2</div>
            <div className="stat-label" style={savedLang?.code === `ar` ? pArStyle : pEnStyle}>
              {savedLang?.code === `ar` ? "مراكز بحثية" : "Research Centers"}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏥</div>
            <div className="stat-number">6</div>
            <div className="stat-label" style={savedLang?.code === `ar` ? pArStyle : pEnStyle}>
              {savedLang?.code === `ar` ? "كليات طبية" : "Medical Colleges"}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💻</div>
            <div className="stat-number">7</div>
            <div className="stat-label" style={savedLang?.code === `ar` ? pArStyle : pEnStyle}>
              {savedLang?.code === `ar` ? "كليات تقنية" : "Technical Colleges"}
            </div>
          </div>
        </div>
      </div>

      {/* Sectors Section */}
      <section className="sectors-section">
        <div className="sectors-header">
          <h2 className="sectors-title" style={savedLang?.code === `ar` ? headArStyle : headEnStyle}>
            {savedLang?.code === `ar` ? "القطاعات الأكاديمية" : "Academic Sectors"}
          </h2>
          <p className="sectors-subtitle" style={savedLang?.code === `ar` ? pArStyle : pEnStyle}>
            {savedLang?.code === `ar` ? "استكشف قطاعاتنا الأكاديمية المتنوعة" : "Explore our diverse academic sectors"}
          </p>
        </div>

        <div className="sectors-container" style={savedLang?.code === `ar` ? pArStyle : pEnStyle}>
          <div className="sectors-list">
            {defaultSectors.map((sector, index) => (
              <div
                key={sector.id}
                className={`sector-item ${mounted ? "visible" : ""}`}
                style={{ transitionDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="sector-panel">
                  <div
                    className={`sector-header ${expandedSector === sector.id ? "expanded" : ""}`}
                    onClick={() => toggleSector(sector.id)}
                  >
                    <div className="sector-content">
                      <div className="sector-icon">{sector.icon}</div>
                      <div className="sector-text">
                        <h3 className="sector-title">{sector.title}</h3>
                        <p className="sector-description">{sector.description}</p>
                      </div>
                      <div className={`sector-chevron ${expandedSector === sector.id ? "expanded" : ""}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className={`sector-expandable ${expandedSector === sector.id ? "expanded" : ""}`}>
                    <div className={`sector-expandable-content ${expandedSector === sector.id ? "expanded" : ""}`}>
                      <div className="sector-details-grid">
                        <div className="about-sector">
                          <div className="section-header">
                            <span className="section-icon">👥</span>
                            <h2>{t("sector-about")}</h2>
                          </div>
                          <p className="sector-detail-text">{sector.detailText}</p>
                        </div>

                        <div className="all-collages">
                          <div className="section-header">
                            <span className="section-icon">🎓</span>
                            <h2>{t("college")}</h2>
                          </div>
                          <div className="colleges-grid">
                            {sector.Colleges.map((college, index) => (
                              <a href={college.link} key={index} className="college-link">
                                {college.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title" style={savedLang?.code === `ar` ? headArStyle : headEnStyle}>
            {savedLang?.code === `ar`
              ? "مستعد للانضمام إلى مجتمعنا الأكاديمي؟"
              : "Ready to Join Our Academic Community?"}
          </h2>
          <p className="cta-description" style={savedLang?.code === `ar` ? pArStyle : pEnStyle}>
            {savedLang?.code === `ar`
              ? "اكتشف فرص التعليم العالمي عبر مجموعة متنوعة من الكليات والبرامج"
              : "Discover world-class education opportunities across our diverse range of faculties and programs."}
          </p>
          <div className="cta-buttons">
            <button className="cta-button primary" style={savedLang?.code === `ar` ? pArStyle : pEnStyle}>
              {savedLang?.code === `ar` ? "استكشف البرامج" : "Explore Programs"}
            </button>
            <button className="cta-button secondary" style={savedLang?.code === `ar` ? pArStyle : pEnStyle}>
              {savedLang?.code === `ar` ? "اتصل بالقبول" : "Contact Admissions"}
            </button>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </div>
  )
}

export default Sector
