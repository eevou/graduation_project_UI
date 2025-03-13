import React from 'react';
import { ExternalLink } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Important Links Section */}
        <div className="footer-section">
          <h2>Important links</h2>
          <div className="columns">
            <ul>
              <li>
                <a href="#">
                  Egyptian Universities Libraries Union
                  <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a href="#">Union of Arab Universities</a>
              </li>
              <li>
                <a href="#">Supreme Council of Universities</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#">Ministry of Higher Education</a>
              </li>
              <li>
                <a href="#">National Authority for Quality Assurance</a>
              </li>
              <li>
                <a href="#">Egyptian Universities Portal</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Important Instructions Section */}
        <div className="footer-section">
          <h2>Important Instructions</h2>
          <div className="columns">
            <ul>
              <li>
                <a href="#">Latest decisions</a>
              </li>
              <li>
                <a href="#">Administrative directives</a>
              </li>
              <li>
                <a href="#">Financial transfer controls</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#">General guidelines</a>
              </li>
              <li>
                <a href="#">Quarterly exam results</a>
              </li>
              <li>
                <a href="#">Paper services for students</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Services Section */}
        <div className="footer-section">
          <h2>Services provided to expatriates</h2>
          <div className="columns">
            <ul>
              <li>
                <a href="#">Applying to University</a>
              </li>
              <li>
                <a href="#">Coordination of admission</a>
              </li>
              <li>
                <a href="#">International Student Guide</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#">Medical fees</a>
              </li>
              <li>
                <a href="#">Social and Sports Club</a>
              </li>
              <li>
                <a href="#">Entertainment Corner</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Evaluation Section */}
        <div className="footer-section">
          <h2 data-multiline="true">{'Evaluation,\ncomplaints and suggestions'}</h2>
          <div className="columns">
            <ul>
              <li>
                <a href="#">Performance evaluation</a>
              </li>
              <li>
                <a href="#">General complaints</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#">Send your suggestions</a>
              </li>
              <li>
                <a href="#">Contact support</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;