import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper";

import "./myproducts.scss";

function Myproducts() {
  const [products, setProducts] = useState("");
  const [noproduct, setNoproduct] = useState(false);
  const API = "http://127.0.0.1:8000/products/myproducts/";
  const popular_products = async (API) => {
    const res = await fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    });
    const data = await res.json();
    if (res.status == 200 && data) {
      setProducts(data);
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
      popular_products(API);
    } else if (res.status == 401) {
      window.location.href = "/login";
    }
  };
  useEffect(() => {
    popular_products(API);
  }, []);
  if (products) {
    if (products.length != 0) {
      return (
        <div className="container">
          <div className="popular myproducts">
            <div className="popular__top">
              <div className="popular__top__left myprodtop">
                <h3 className="popular__title">My products</h3>
                <div className="add">
                  <Link className="linkk" to="/addproduct">+ Add</Link>
                </div>
              </div>
            </div>
            <div className="products">
              <Swiper
                slidesPerView={4}
                grid={{
                  rows: 2,
                }}
                spaceBetween={20}
                pagination={{
                  clickable: true,
                }}
                modules={[Grid, Pagination]}
                className="swiper2"
                breakpoints={{
                  // when window width is >= 320px
                  1150: {
                    slidesPerView: 4,
                  },
                  900: {
                    slidesPerView: 3,
                  },
                  585: {
                    slidesPerView: 2,
                  },
                  250: {
                    slidesPerView: 1,
                  },
                }}
              >
                {products.map((prod) => {
                  return (
                    <SwiperSlide className="swiper-slide2" key={prod.yuid}>
                      <div className="product">
                        <div className="img">
                          <img src={prod.photo} alt="" />
                        </div>
                        <h4 className="title">{prod.title}</h4>
                        <p className="cost">
                          $ <span>{prod.cost}</span>
                        </p>
                        <p className="desc">{prod.desc}</p>
                        <div className="product__links">
                          <Link
                            className="addcart update"
                            to={`/update/${prod.yuid}`}
                          >
                            Update
                          </Link>
                          <Link
                            className="viewmore delete"
                            onClick={() => {
                              delete_product(
                                `http://127.0.0.1:8000/products/myproducts/${prod.yuid}`
                              );
                            }}
                          >
                            Delete
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className={`popular myproducts ${noproduct ? "noproduct" : ""}`}>
            <div className="popular__top">
              <div className="popular__top__left myprodtop">
                <h3 className="popular__title">My products</h3>
                <div className="add">
                  <Link className="linkk" to="/addproduct">+ Add</Link>
                </div>
              </div>
            </div>
            <div className="products">You have not products!</div>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="container">
        <div className="popular">
          <div className="popular__top">
            <div className="popular__top__left">
              <h3 className="popular__title">My products</h3>
            </div>
          </div>
          <div className="products">
            <h2>Loading ...</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Myproducts;
