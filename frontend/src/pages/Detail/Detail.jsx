import React, { useState } from "react";
import { useParams } from "react-router";
import { GiCheckMark } from "react-icons/gi";

import Product from "../../assets/detail.jpg";
import "./detail.scss";

function Detail() {
  const { yuid } = useParams();
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="container">
      <div className="detail">
        <div className="product__info">
          <div className="detail__img">
            <img src={Product} alt="" />
          </div>
          <div className="infos">
            <h2 className="title">Canon camera</h2>
            <p className="cost">
              $ <span>11.70</span>
            </p>
            <p className="available">
              Availability :
              <span>
                <GiCheckMark /> In stock
              </span>
            </p>
            <div className="quantity">
              <p className="quantity__txt">Quantity : </p>
              <div className="quantity__btns">
                <div
                  className="minus"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                >
                  -
                </div>
                <div className="quantity__num"> {quantity} </div>
                <div
                  className="plus"
                  onClick={() => {
                    setQuantity(quantity + 1);
                  }}
                >
                  +
                </div>
              </div>
            </div>
            <div className="detail__btns">
              <button>Add to cart</button>
              <button>Buy it now</button>
            </div>
            <div className="category">
              <p className="category__txt">
                Category : <span>Camera</span>
              </p>
            </div>
            <div className="category brand">
              <p className="category__txt">
                Brand : <span>Apple</span>
              </p>
            </div>
            <p className="desc">
              <span>Description</span> : Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Qui explicabo, iste itaque nulla dolore officia
              aut velit eaque minima totam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
