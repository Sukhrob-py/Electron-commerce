import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FaGoogle } from "react-icons/fa";
import { RiFacebookBoxLine } from "react-icons/ri";
import { BsWhatsapp } from "react-icons/bs";

import FooterLogo from "../../../assets/footer-logo.png";

import "./footer.scss";

function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="container">
        <div className="footer">
          <div className="footer-form">
            <div className="footer-form-title">
              <h2 className="title">Subscribe newsletter</h2>
            </div>
            <form>
              <input type="text" placeholder="Email address" />
              <button>
                <AiOutlineSend className="icon" />
              </button>
            </form>
            <div className="footer-contact">
              <div className="icon-box">
                <TfiHeadphoneAlt className="icon" />
              </div>
              <p className="txt">
                Call us 24/7 :<br />
                (+998)91 634 19 85
              </p>
            </div>
          </div>
          <div className="footer-main">
            <div className="footer-main-first">
              <div className="footer-logo">
                <img src={FooterLogo} alt="" />
              </div>
              <p className="txt">
                64 st james boulevard <br /> hoswick , ze2 7zj
              </p>
              <div className="social">
                <a href="https://google.com">
                  <FaGoogle className="icon" />
                </a>
                <a href="https://facebook.com">
                  <RiFacebookBoxLine className="icon" />
                </a>
                <a href="https://whatsup.com">
                  <BsWhatsapp className="icon" />
                </a>
              </div>
            </div>
            <div className="footer-main-links">
              <h4 className="links-title">Find product</h4>
              <ul className="links-list">
                <li className="links-item">
                  <Link className="link">Brownze arnold</Link>
                </li>
                <li className="links-item">
                  <Link className="link">Chronograph blue</Link>
                </li>
                <li className="links-item">
                  <Link className="link">Smart phones</Link>
                </li>
                <li className="links-item">
                  <Link className="link">Automatic watch</Link>
                </li>
                <li className="links-item">
                  <Link className="link">Hair straighteners</Link>
                </li>
              </ul>
            </div>
            <div className="footer-main-links">
              <h4 className="links-title">Get help</h4>
              <ul className="links-list">
                <li className="links-item">
                  <Link className="link">About us</Link>
                </li>
                <li className="links-item">
                  <Link className="link">Contact us</Link>
                </li>
                <li className="links-item">
                  <Link className="link">Return policy</Link>
                </li>
                <li className="links-item">
                  <Link className="link">Privacy policy</Link>
                </li>
                <li className="links-item">
                  <Link className="link">Payment policy</Link>
                </li>
              </ul>
            </div>
            <div className="footer-main-links">
              <h4 className="links-title">About us</h4>
              <ul className="links-list">
                <li className="links-item">
                  <Link className="link">News</Link>
                </li>
                <li className="links-item">
                  <Link className="link">Service</Link>
                </li>
                <li className="links-item">
                  <Link className="link">Our policy</Link>
                </li>
                <li className="links-item">
                  <Link className="link">Custmer care</Link>
                </li>
                <li className="links-item">
                  <Link className="link">Faq’s</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
