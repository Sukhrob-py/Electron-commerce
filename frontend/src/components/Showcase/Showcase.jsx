import React from "react";

import Camera from '../../assets/showcase.png'
import "./showcase.scss";

function Showcase() {
  return (
    <div className="container">
      <div className="showcase">
        <div className="showcase__left">
          <p className="product__title">
            Canon <br /> camera
          </p>
          <div className="btns">
            <button className="shop">Shop now</button>
            <button className="view">View more</button>
          </div>
        </div>
        <div className="showcase__right">
          <div className="product__img">
            <img src={Camera} alt="" />
            <p className="cost">only <br />89$</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Showcase;
