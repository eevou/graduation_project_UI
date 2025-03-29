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
                <a href="#">{t("footer.importantLatestDecisions")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.importantConditionsTransfers")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.importantAdministrativeDirectives")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.importantFinancialTransferControls")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.importantQuarterlyExamResults")}</a>{" "}
              </li>
            </ul>
            <ul>
              <li>
                {" "}
                <a href="#">{t("footer.importantGeneralGuidelines")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.importantPaperServices")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.importantStoppingRegistration")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.MinistryofHigherEducation")}</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.NationalAuthorityforQualityAssuranceandAccreditation")}</a>{" "}
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
            <div className="social-facebook">
              <i className="fa-brands fa-facebook"></i>
            </div>
            <div className="social-x">
              <i className="fa-brands fa-x-twitter"></i>
            </div>
            <div className="social-youtube">
              <i className="fa-brands fa-youtube"></i>
            </div>
            <div className="social-envelope">
              <i className="fa-solid fa-envelope"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
