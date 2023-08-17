import React from "react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer__container container">
        <ul className="footer__list">
          <li>
            <a
              href="https://arib-portfolio.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              Projects
            </a>
          </li>
        </ul>
        <div className="footer__social">
          <a
            href="https://github.com/arib0903"
            className="home__social-icon"
            target="_blank"
            rel="noreferrer"
          >
            <FiGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/arib-mahboob-0931061b5/"
            className="home__social-icon"
            target="_blank"
            rel="noreferrer"
          >
            <FiLinkedin />
          </a>
        </div>

        <span className="footer__copy"></span>
      </div>
    </footer>
  );
};

export default Footer;
