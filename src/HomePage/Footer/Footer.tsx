import React from "react";
import { ExternalLink } from "lucide-react";
import "./Footer.css";
import logo1 from "../../assets/MNF_logo.png";
import logo2 from "../../assets/image.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const date = new Date().getFullYear();
  const savedLang = JSON.parse(localStorage.getItem("lang"));
  const { i18n, t } = useTranslation();

  const ArStyle = {
    fontFamily: "var(--MNF_Body_AR)",
    lineHeight: "1.5",
  }

  const EnStyle = {
    fontFamily: "var(--MNF_Body_EN)",
  }

  return (
    <div>
      <div className="footer-container" style={savedLang?.code === `ar` ? ArStyle : EnStyle}>
        <div className="footer-sector">
          <h3 className={savedLang?.code === `ar` ? "footer-title footer-titleAr" : "footer-title"}>{t("footer.keyInformation")}</h3>
          <div className="ul-container">
            <ul>
              <li>
                {" "}
                <a href="#">{t("footer.latestDecisions")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.conditionsTransfers")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.administrativeDirectives")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.financialTransferControls")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.quarterlyExamResults")}</a>{" "}
              </li>
            </ul>
            <ul>
              <li>
                {" "}
                <a href="#">{t("footer.generalGuidelines")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.paperServices")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.stoppingRegistration")}</a>{" "}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-sector">
          <h3 className={savedLang?.code === `ar` ? "footer-title footer-titleAr" : "footer-title"}>{t("footer.importantLinks")}</h3>
          <div className="ul-container">
            <ul>
              <li>
                {" "}
                <a target="blank" href="https://scu.eg/eksc_units/%d8%b4%d8%a8%d9%83%d8%a9-%d8%a7%d9%84%d8%ac%d8%a7%d9%85%d8%b9%d8%a7%d8%aa-%d8%a7%d9%84%d9%85%d8%b5%d8%b1%d9%8a%d9%87/">{t("footer.importantLatestDecisions")}</a>{" "}
              </li>
              <li>
                {" "}
                <a target="blank" href="https://nelc.gov.sa/">{t("footer.importantConditionsTransfers")}</a>{" "}
              </li>
              <li>
                {" "}
                <a target="blank" href="https://digital.gov.eg/">{t("footer.importantAdministrativeDirectives")}</a>{" "}
              </li>
              <li>
                {" "}
                <a target="blank" href="http://www.monofeya.gov.eg/Default.aspx">{t("footer.importantFinancialTransferControls")}</a>{" "}
              </li>
              <li>
                {" "}
                <a target="blank" href="https://stdf.eg/">{t("footer.importantQuarterlyExamResults")}</a>{" "}
              </li>
            </ul>
            <ul>
              <li>
                {" "}
                <a target="blank" href="http://srv4.eulc.edu.eg/eulc_v5/libraries/start.aspx">{t("footer.importantGeneralGuidelines")}</a>{" "}
              </li>
              <li>
                {" "}
                <a target="blank" href="https://www.aaru.edu.jo/home.aspx">{t("footer.importantPaperServices")}</a>{" "}
              </li>
              <li>
                {" "}
                <a target="blank" href="https://scu.eg/">{t("footer.importantStoppingRegistration")}</a>{" "}
              </li>
              <li>
                {" "}
                <a target="blank" href="https://mohesr.gov.eg/ar-eg/Pages/Home.aspx">{t("footer.MinistryofHigherEducation")}</a>{" "}
              </li>
              <li>
                {" "}
                <a target="blank" href="https://naqaae.eg/">{t("footer.NationalAuthorityforQualityAssuranceandAccreditation")}</a>{" "}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-sector">
          <h3 className={savedLang?.code === `ar` ? "footer-title footer-titleAr" : "footer-title"}>{t("footer.serviceGuide")}</h3>
          <div className="ul-container">
            <ul>
              <li>
                {" "}
                <a href="#">{t("footer.serviceGuideLatestDecisions")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.serviceGuideConditionsTransfers")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.serviceGuideAdministrativeDirectives")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.serviceGuideFinancialTransferControls")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.serviceGuideQuarterlyExamResults")}</a>{" "}
              </li>
            </ul>
            <ul>
              <li>
                {" "}
                <a href="#">{t("footer.serviceGuideGeneralGuidelines")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.serviceGuidePaperServices")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.serviceGuideStoppingRegistration")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.serviceReview")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.EntertainmentCorner")}</a>{" "}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-sector">
          <h3 className={savedLang?.code === `ar` ? "footer-title footer-titleAr" : "footer-title"}>
            {t("footer.Evaluationcomplaintsandsuggestions")}
          </h3>
          <div className="ul-container">
            <ul>
              <li>
                {" "}
                <a href="#">{t("footer.performanceEvaluation")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.generalComplaints")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.sendSuggestions")}</a>{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bottom-footer-container">
        <div className="footer-logos">
          <img src={logo2} alt="Expatriate_logo" />
          <img src={logo1} alt="MNF_logo" />
        </div>

        <div className="social-copyRights" style={savedLang?.code === `ar` ? ArStyle : EnStyle}>
          <p>{t("footer.copyrights")} {date}. ©</p>

          <div className="social">
            <a target="blank" href="https://www.facebook.com"><div className="social-facebook">
              <i className="fa-brands fa-facebook"></i>
            </div></a>

            <a target="blank" href="https://x.com/X."><div className="social-x">
              <i className="fa-brands fa-x-twitter"></i>
            </div></a>

            <a target="blank" href="https://www.youtube.com"><div className="social-youtube">
              <i className="fa-brands fa-youtube"></i>
            </div></a>

            <a target="blank" href="https://mail.google.com/"><div className="social-envelope">
              <i className="fa-solid fa-envelope"></i>
            </div></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
