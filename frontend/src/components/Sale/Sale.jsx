import React from "react";

import Laptop from "../../assets/sale.png";

import "./sale.scss";

function Sale() {
  return (
    <div className="container">
      <div className="sale">
        <div className="sale__img">
          <img src={Laptop} alt="" />
        </div>
        <div className="sale__info">
          <button>New laptop</button>
          <h2 className="sale__title">Sale up to 50% off</h2>
          <p className="sale__charactericts">12 inch hd display</p>
          <button>Shop now</button>
        </div>
      </div>
    </div>
  );
}

export default Sale;
