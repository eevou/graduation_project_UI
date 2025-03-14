import React from "react";
import { ExternalLink } from "lucide-react";
import "./Footer.css";
import logo1 from "../../assets/MNF_logo.png";
import logo2 from "../../assets/image.png";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <div>
      <div className="footer-container">
        <div className="footer-sector">
          <h3 className="footer-title">Important Instructions</h3>
          <div className="ul-container">
            <ul>
              <li>
                {" "}
                <a href="#">Latest Decisions</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">
                  Conditions for Internal and External Transfers
                </a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">Administrative Directives</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">Financial Transfer Controls</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">Quarterly Exam Results</a>{" "}
              </li>
            </ul>
            <ul>
              <li>
                {" "}
                <a href="#">General Guidelines</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">
                  Paper Services and Statements Provided to Students
                </a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">Stopping the Registration and Freezing</a>{" "}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-sector">
          <h3 className="footer-title">Important links</h3>
          <div className="ul-container">
            <ul>
              <li>
                {" "}
                <a href="#">Latest Decisions</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">
                  Conditions for Internal and External Transfers
                </a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">Administrative Directives</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">Financial Transfer Controls</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">Quarterly Exam Results</a>{" "}
              </li>
            </ul>
            <ul>
              <li>
                {" "}
                <a href="#">General Guidelines</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">
                  Paper Services and Statements Provided to Students
                </a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">Stopping the Registration and Freezing</a>{" "}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-sector">
          <h3 className="footer-title">Services provided to expatriates</h3>
          <div className="ul-container">
            <ul>
              <li>
                {" "}
                <a href="#">Latest Decisions</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">
                  Conditions for Internal and External Transfers
                </a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">Administrative Directives</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">Financial Transfer Controls</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">Quarterly Exam Results</a>{" "}
              </li>
            </ul>
            <ul>
              <li>
                {" "}
                <a href="#">General Guidelines</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">
                  Paper Services and Statements Provided to Students
                </a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">Stopping the Registration and Freezing</a>{" "}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-sector">
          <h3 className="footer-title">
            Evaluation, complaints and suggestions
          </h3>
          <div className="ul-container">
            <ul>
              <li>
                {" "}
                <a href="#">Performance evaluation</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">General complaints</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">Send your suggestions</a>{" "}
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

        <div className="social-copyRights">
          <p>All copyrights are reserved at Menofia University {date}. ©</p>

          <div className="social">
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-x-twitter"></i>
          <i className="fa-brands fa-youtube"></i>
          <i className="fa-solid fa-envelope"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
