import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlEye } from "react-icons/sl";
import { BsFillCartPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper";

import "./popular.scss";

function Popular() {
  const [products, setProducts] = useState("");
  const API = "http://127.0.0.1:8000/products/populars/";
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
    } else if (res.status == 401) {
      window.location.href = "/login";
    }
  };
  const addcart = async (API,yuid) => {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      body: JSON.stringify({
        product_yuid: yuid,
        quantity: 1,
      }),
    });
    const data = await res.json();
    console.log(data);
    console.log(res);
    if (res.status == 201) {
      window.alert("product added to cart!");
    } else if (res.status == 401) {
      window.localStorage.href = "/login";
    } else {
      window.alert("something wrong please try again!");
      window.localStorage.href = "/";
    }
  };
  useEffect(() => {
    popular_products(API);
  }, []);
  if (products) {
    return (
      <div className="container">
        <div className="popular">
          <div className="popular__top">
            <div className="popular__top__left">
              <h3 className="popular__title">Popular products</h3>
            </div>
            <div className="popular__top__right">
              <div className="categories">
                <button>Cameras</button>
                <button>Laptops</button>
                <button>Phones</button>
                <button>Tablets</button>
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
                      <div className="product__links">
                        <Link
                          className="addcart"
                          onClick={() => {
                            addcart("http://127.0.0.1:8000/cart/create/",prod.yuid);
                          }}
                        >
                          Add to cart <BsFillCartPlusFill className="icon" />
                        </Link>
                        <Link className="viewmore" to={`detail/${prod.yuid}`}>
                          <SlEye className="icon" />
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
        <div className="popular">
          <div className="popular__top">
            <div className="popular__top__left">
              <h3 className="popular__title">Popular products</h3>
            </div>
            <div className="popular__top__right">
              <div className="categories">
                <button>Cameras</button>
                <button>Laptops</button>
                <button>Phones</button>
                <button>Tablets</button>
              </div>
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

export default Popular;
