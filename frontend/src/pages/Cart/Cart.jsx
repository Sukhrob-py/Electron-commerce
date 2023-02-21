import React from "react";
import { CgCloseO } from "react-icons/cg";

import ProductImg from "../../assets/detail.jpg";
import "./cart.scss";
function Cart() {
  return (
    <div className="container">
      <div className="cart">
        <div className="products">
          <div className="top">
            <div className="title-img">
              <h3>Product</h3>
            </div>
            <div className="quantity">
              <h3>Quantity</h3>
            </div>
            <div className="subtotal">
              <h3>Subtotal</h3>
            </div>
            <div className="delete"></div>
          </div>
          <div className="products__list">
            <div className="cart-product top">
              <div className="title-img">
                <div className="img">
                  <img src={ProductImg} alt="" />
                </div>
                <div className="title">
                  <h3 className="title__txt">Play game</h3>
                  <p className="cost">
                    $ <span>11.70</span>
                  </p>
                </div>
              </div>
              <div className="quantity">
                <p className="quantity__txt">1</p>
              </div>
              <div className="subtotal">
                <p className="subtotal__txt">
                  $ <span>11.70</span>
                </p>
              </div>
              <div className="delete">
                <CgCloseO className="icon" />
              </div>
            </div>
            <div className="cart-product top">
              <div className="title-img">
                <div className="img">
                  <img src={ProductImg} alt="" />
                </div>
                <div className="title">
                  <h3 className="title__txt">Play game</h3>
                  <p className="cost">
                    $ <span>11.70</span>
                  </p>
                </div>
              </div>
              <div className="quantity">
                <p className="quantity__txt">1</p>
              </div>
              <div className="subtotal">
                <p className="subtotal__txt">
                  $ <span>11.70</span>
                </p>
              </div>
              <div className="delete">
                <CgCloseO className="icon" />
              </div>
            </div>
          </div>
          <div className="btns">
            <button className="shop">Continue shopping</button>
            <button className="clear">Clear cart</button>
          </div>
        </div>
        <div className="total products">
          <div className="top">
            <h3>Cart total</h3>
          </div>
          <div className="total-wrap">
            <div className="total-cost">
              <p>Total</p>
              <p>
                $ <span>23.20</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
