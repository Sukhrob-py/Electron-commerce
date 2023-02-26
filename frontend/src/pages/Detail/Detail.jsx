import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GiCheckMark } from "react-icons/gi";

import "./detail.scss";

function Detail() {
  const { yuid } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState("");
  const API = `http://127.0.0.1:8000/products/products/${yuid}`;
  const get_product = async (API) => {
    const res = await fetch(API, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    });
    const data = await res.json();
    if (res.status == 200 && data) {
      setProduct(data);
    } else if (res.status == 401) {
      window.location.href = "/login";
    } else {
      window.alert("something wrong please try again!");
    }
  };
  const addcart = async (API) => {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      body: JSON.stringify({
        product_yuid: yuid,
        quantity: quantity,
      }),
    });
    const data = await res.json();
    console.log(data);
    console.log(res);
    if (res.status == 201) {
      window.alert("product added to cart!");
      window.location.href = "/";
    } else if (res.status == 401) {
      window.localStorage.href = "/login";
    } else {
      window.alert("something wrong please try again!");
      window.localStorage.href = "/";
    }
  };
  useEffect(() => {
    get_product(API);
  }, []);
  if (product) {
    return (
      <div className="container">
        <div className="detail">
          <div className="product__info">
            <div className="detail__img">
              <img src={product.photo} alt="" />
            </div>
            <div className="infos">
              <h2 className="title">{product.title}</h2>
              <p className="cost">
                $ <span>{product.cost}</span>
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
                <button
                  onClick={() => {
                    addcart("http://127.0.0.1:8000/cart/create/");
                  }}
                >
                  Add to cart
                </button>
                <button>Buy it now</button>
              </div>
              <div className="category">
                <p className="category__txt">
                  Category : <span>{product.category}</span>
                </p>
              </div>
              <div className="category brand">
                <p className="category__txt">
                  Brand : <span>{product.brand}</span>
                </p>
              </div>
              <p className="desc">
                <span>Description</span> : {product.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="detail">
          <div className="product__info">
            <h2>Loading ...</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
