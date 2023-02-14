import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./home-category.scss";

import Camera from "../../assets/category.png";
SwiperCore.use([Pagination, Navigation]);
function HomeCategory() {
  return (
    <div className="container">
      <div className="home-category">
        <Swiper
          className="swiper"
          spaceBetween={15}
          pagination={{ clickable: true }}
          slidesPerView={3}
          breakpoints={{
            // when window width is >= 320px
            750: {
              slidesPerView: 3,
              spaceBetween: 15
            },
            600: {
              slidesPerView: 2.5,
              spaceBetween: 10
            },
            380: {
              slidesPerView: 1.6,
              spaceBetween: 10
            },
            250: {
              slidesPerView: 1.2,
              spaceBetween: 6
            },
            
          }}
        >
          <SwiperSlide className="swiper-slide">
            <div className="category-item">
              <div className="img">
                <img src={Camera} alt="" />
              </div>
              <div className="info">
                <h4 className="category-title">Speaker</h4>
                <p className="quantity">(6 items)</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="category-item">
              <div className="img">
                <img src={Camera} alt="" />
              </div>
              <div className="info">
                <h4 className="category-title">Speaker</h4>
                <p className="quantity">(6 items)</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="category-item">
              <div className="img">
                <img src={Camera} alt="" />
              </div>
              <div className="info">
                <h4 className="category-title">Speaker</h4>
                <p className="quantity">(6 items)</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="category-item">
              <div className="img">
                <img src={Camera} alt="" />
              </div>
              <div className="info">
                <h4 className="category-title">Speaker</h4>
                <p className="quantity">(6 items)</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default HomeCategory;
