import React from "react";
import { ImBoxAdd } from "react-icons/im";
import { SiSpringsecurity } from "react-icons/si";
import { RiVipCrownFill } from "react-icons/ri";

import "./offer.scss";

function Offer() {
  return (
    <div className="container">
      <div className="offer">
        <div className="offer__item">
          <div className="icon-box">
            <ImBoxAdd className="icon" />
          </div>
          <div className="txt">
            <h4 className="title">Free delivery</h4>
            <p className="info">on order above $50,00</p>
          </div>
        </div>
        <div className="offer__item">
          <div className="icon-box">
            <RiVipCrownFill className="icon" />
          </div>
          <div className="txt">
            <h4 className="title">Best quality </h4>
            <p className="info">best quality in low price</p>
          </div>
        </div>
        <div className="offer__item">
          <div className="icon-box">
            <SiSpringsecurity className="icon" />
          </div>
          <div className="txt">
            <h4 className="title">1 year warranty</h4>
            <p className="info">Avaliable warranty</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offer;
