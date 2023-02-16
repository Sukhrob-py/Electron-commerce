import React from "react";

import { AiOutlineSend } from "react-icons/ai";
import { TfiHeadphoneAlt } from "react-icons/tfi";

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
                (+62) 0123 567 789
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
