import React from "react";
import { Link } from "react-router-dom";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.row}>
          <div className={classes["footer-col"]}>
            <h4>Info</h4>
            <ul>
              <li>
                <Link className={classes.link} to="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className={classes.link} to="/our-services">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/private-policy" className={classes.link}>
                  Private Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className={classes["footer-col"]}>
            <h4>Get Help</h4>
            <ul>
              <li>
                <Link className={classes.link} to="/faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className={classes.link} to="/subscribe">
                  Subscribe
                </Link>
              </li>
            </ul>
          </div>
          <div className={classes["footer-col"]}>
            <h4>Follow Us</h4>
            {/* <div> */}
            <div className={classes.social_link}>
              <a href="https://www.facebook.com/koko.miles.92">
                <i className="fab fa-facebook-square"></i>
              </a>
              <a href="https://twitter.com/_KokoMarTinS?s=08">
                <i className="fab fa-twitter-square"></i>
              </a>
              <a href="https://www.instagram.com/official_kokomartins?r=nametag">
                <i className="fab fa-instagram-square"></i>
              </a>
              <a href="https://www.instagram.com/official_kokomartins?r=nametag">
                <i className="fab fa-tiktok"></i>
              </a>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
