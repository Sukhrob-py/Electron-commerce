import React, { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlEye } from "react-icons/sl";
import { BsFillCartPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Grid, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import { SearchContext } from "../../components/Layout/Nav/Nav";
import "./filter.scss";

function Filter() {
  const [products, setProducts] = useState("");
  const [quantity, setQuantity] = useState("");
  let { search, btn } = useContext(SearchContext);
  const API = "http://127.0.0.1:8000/products/products/";
  const API2 = "http://127.0.0.1:8000/products/filter_category/";
  const API3 = "http://127.0.0.1:8000/products/quantity_category/";
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
  const category_quantity = async (API) => {
    const res = await fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    });
    const data = await res.json();
    if (res.status == 200 && data) {
      setQuantity(JSON.parse(data.data));
      // console.log(JSON.parse(data.data));
    } else if (res.status == 401) {
      window.location.href = "/login";
    }
  };
  const addcart = async (API, yuid) => {
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
  const filtered_data = async (API, cat) => {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      body: JSON.stringify({
        category: cat,
      }),
    });
    const data = await res.json();
    if (res.status == 200) {
      setProducts(JSON.parse(data.data));
    } else if (res.status == 401) {
      window.localStorage.href = "/login";
    } else {
      window.alert("something wrong please try again!");
      window.localStorage.href = "/";
    }
  };
  const search_name = async (API) => {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      body: JSON.stringify({
        name: search,
      }),
    });
    const data = await res.json();
    if (res.status == 200 && data) {
      setProducts(JSON.parse(data.data));
    } else if (res.status == 401) {
      window.location.href = "/login";
    }
  };
  if (btn) {
    search_name("http://127.0.0.1:8000/products/filter/");
  }
  useEffect(() => {
    popular_products(API);
    category_quantity(API3);
  }, []);
  if (products && products.length > 0 && quantity) {
    return (
      <div className="container">
        <div className="filter">
          <div className="sidebar">
            <div className="by-category">
              <h4 className="title">Categories</h4>
              <div className="by-category-list">
                {quantity.map((quant) => {
                  let keyy, valuee;
                  for (const key in quant) {
                    keyy = key;
                    valuee = quant[key];
                  }
                  return (
                    <div className="list-item" key={keyy}>
                      <button
                        onClick={(e) => {
                          filtered_data(API2, e.target.innerText);
                        }}
                      >
                        {keyy}
                      </button>
                      <span>{valuee}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="products">
            <Swiper
              slidesPerView={3}
              grid={{
                rows: 3,
              }}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              modules={[Grid, Pagination]}
              className="swiper2"
              breakpoints={{
                1150: {
                  slidesPerView: 3,
                },
                850: {
                  slidesPerView: 2,
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
                            addcart(
                              "http://127.0.0.1:8000/cart/create/",
                              prod.yuid
                            );
                          }}
                        >
                          Add to cart <BsFillCartPlusFill className="icon" />
                        </Link>
                        <Link className="viewmore" to={`/detail/${prod.yuid}`}>
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
  } else if (products && products.length == 0 && quantity) {
    return (
      <div className="container">
        <div className="filter">
          <div className="sidebar">
            <div className="by-category">
              <h4 className="title">Categories</h4>
              <div className="by-category-list">
                {quantity.map((quant) => {
                  let keyy, valuee;
                  for (const key in quant) {
                    keyy = key;
                    valuee = quant[key];
                  }
                  return (
                    <div className="list-item" key={keyy}>
                      <button
                        onClick={(e) => {
                          filtered_data(API2, e.target.innerText);
                        }}
                      >
                        {keyy}
                      </button>
                      <span>{valuee}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="products">
            <h2>No products</h2>
          </div>
        </div>
      </div>
    );
  } else {
    <div className="">loading ...</div>;
  }
}

export default Filter;
