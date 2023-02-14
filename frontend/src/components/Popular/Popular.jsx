import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlEye } from "react-icons/sl";
import { BsFillCartPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper";

import Product from "../../assets/product.png";

import "./popular.scss";

function Popular() {
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
                    Add to cart <BsFillCartPlusFill className="icon"/>
                  </Link>
                  <Link className="viewmore">
                    <SlEye className="icon" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
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
                    Add to cart <BsFillCartPlusFill className="icon"/>
                  </Link>
                  <Link className="viewmore">
                    <SlEye className="icon" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
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
                    Add to cart <BsFillCartPlusFill className="icon"/>
                  </Link>
                  <Link className="viewmore">
                    <SlEye className="icon" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
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
                    Add to cart <BsFillCartPlusFill className="icon"/>
                  </Link>
                  <Link className="viewmore">
                    <SlEye className="icon" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
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
                    Add to cart <BsFillCartPlusFill className="icon"/>
                  </Link>
                  <Link className="viewmore">
                    <SlEye className="icon" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
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
                    Add to cart <BsFillCartPlusFill className="icon"/>
                  </Link>
                  <Link className="viewmore">
                    <SlEye className="icon" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
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
                    Add to cart <BsFillCartPlusFill className="icon"/>
                  </Link>
                  <Link className="viewmore">
                    <SlEye className="icon" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
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
                    Add to cart <BsFillCartPlusFill className="icon"/>
                  </Link>
                  <Link className="viewmore">
                    <SlEye className="icon" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
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
                    Add to cart <BsFillCartPlusFill className="icon"/>
                  </Link>
                  <Link className="viewmore">
                    <SlEye className="icon" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
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
                    Add to cart <BsFillCartPlusFill className="icon"/>
                  </Link>
                  <Link className="viewmore">
                    <SlEye className="icon" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
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
                    Add to cart <BsFillCartPlusFill className="icon"/>
                  </Link>
                  <Link className="viewmore">
                    <SlEye className="icon" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
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
                    Add to cart <BsFillCartPlusFill className="icon"/>
                  </Link>
                  <Link className="viewmore">
                    <SlEye className="icon" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
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
                    Add to cart <BsFillCartPlusFill className="icon"/>
                  </Link>
                  <Link className="viewmore">
                    <SlEye className="icon" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
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
                    Add to cart <BsFillCartPlusFill className="icon"/>
                  </Link>
                  <Link className="viewmore">
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

export default Popular;
