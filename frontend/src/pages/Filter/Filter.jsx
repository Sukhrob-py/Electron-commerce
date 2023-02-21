import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlEye } from "react-icons/sl";
import { BsFillCartPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper";

import "./filter.scss";

import Product from "../../assets/product.png";
function Filter() {
  return (
    <div className="container">
      <div className="filter">
        <div className="sidebar">
          <div className="by-category">
            <h4 className="title">Categories</h4>
            <div className="by-category-list">
              <div className="list-item">
                <button>All categories</button>
                <span>10</span>
              </div>
              <div className="list-item">
                <button>Tablet</button>
                <span>5</span>
              </div>
              <div className="list-item">
                <button>Laptop</button>
                <span>5</span>
              </div>
              <div className="list-item">
                <button>Headphones</button>
                <span>15</span>
              </div>
              <div className="list-item">
                <button>Console</button>
                <span>10</span>
              </div>
              <div className="list-item">
                <button>Other</button>
                <span>7</span>
              </div>
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
              // when window width is >= 320px
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
            <SwiperSlide className="swiper-slide2">
              <div className="product">
                <div className="img">
                  <img src={Product} alt="" />
                </div>
                <h4 className="title">Canon camera</h4>
                <p className="cost">
                  $ <span>11.70</span>
                </p>
                <div className="product__links">
                  <Link className="addcart">
                    Add to cart <BsFillCartPlusFill className="icon" />
                  </Link>
                  <Link className="viewmore" to="detail/yuid">
                    <SlEye className="icon" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Filter;
