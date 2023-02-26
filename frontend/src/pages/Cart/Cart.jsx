import React, { useEffect, useState } from "react";
import { CgCloseO } from "react-icons/cg";
import { json } from "react-router";

import ProductImg from "../../assets/detail.jpg";
import "./cart.scss";
function Cart() {
  const [products, setProducts] = useState("");
  const [noproduct, setNoproduct] = useState(false);
  let total = 0;
  const API = "http://127.0.0.1:8000/cart/mycart/";
  const cart_products = async (API) => {
    const res = await fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    });
    const data = await res.json();
    console.log(data);
    console.log(res);
    if (res.status == 200 && data) {
      setProducts(JSON.parse(data.data));
      if (data.length == 0) {
        setNoproduct(true);
      }
    } else if (res.status == 401) {
      window.location.href = "/login";
    }
  };
  const delete_product = async (API2) => {
    const res = await fetch(API2, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    });
    const data = await res.json();
    if (res.status == 200 && data) {
      cart_products(API);
    } else if (res.status == 401) {
      window.location.href = "/login";
    } else {
      window.alert("something wrong please try again!");
    }
  };

  const clear_cart = async (API2 = "http://127.0.0.1:8000/cart/clear/") => {
    const res = await fetch(API2, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    });
    const data = await res.json();
    if (res.status == 200 && data) {
      cart_products(API);
    } else if (res.status == 401) {
      window.location.href = "/login";
    } else {
      window.alert("something wrong please try again!");
    }
  };

  useEffect(() => {
    cart_products(API);
  }, []);
  if (products) {
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
              {products.map((cart_item) => {
                console.log("http://127.0.0.1:8000/media/" + cart_item.photo);
                const cost = +(
                  +cart_item.quantity * parseFloat(cart_item.cost)
                ).toFixed(2);
                total += cost;
                return (
                  <div className="cart-product top" key={cart_item.yuid}>
                    <div className="title-img">
                      <div className="img">
                        <img
                          src={"http://127.0.0.1:8000/media/" + cart_item.photo}
                          alt=""
                        />
                      </div>
                      <div className="title">
                        <h3 className="title__txt">{cart_item.title}</h3>
                        <p className="cost">
                          $ <span>{cart_item.cost}</span>
                        </p>
                      </div>
                    </div>
                    <div className="quantity">
                      <p className="quantity__txt">{cart_item.quantity}</p>
                    </div>
                    <div className="subtotal">
                      <p className="subtotal__txt">
                        $ <span>{cost}</span>
                      </p>
                    </div>
                    <div className="delete">
                      <CgCloseO
                        className="icon"
                        onClick={() => {
                          delete_product(
                            `http://127.0.0.1:8000/cart/delete/${cart_item.yuid}`
                          );
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="btns">
              <button className="shop">Continue shopping</button>
              <button
                className="clear"
                onClick={() => {
                  clear_cart();
                }}
              >
                Clear cart
              </button>
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
                  $ <span>{total.toFixed(2)}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    <div className="">no product</div>;
  }
}

export default Cart;
