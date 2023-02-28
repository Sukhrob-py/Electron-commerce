import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { GrLocation } from "react-icons/gr";
import { FaCartArrowDown } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { AiOutlineCloseSquare, AiOutlineMenu } from "react-icons/ai";
import { RxPerson } from "react-icons/rx";
import { RiShoppingCart2Line } from "react-icons/ri";
import { MdLogout } from "react-icons/md";

import Logo from "../../../assets/logo.png";

import "./nav.scss";

export const SearchContext = createContext();

function Nav(props) {
  const [sidelinks, setSidelinks] = useState(false);
  const [search, setSearch] = useState("");
  const [btn, setBtn] = useState(false);
  const [searchinput, setSearchInput] = useState(false);
  const access = localStorage.getItem("access");
  useEffect(() => {
    const input_search = document.querySelector(".search_input");
  }, []);
  return (
    <SearchContext.Provider value={{ search, btn }}>
      <div className="nav">
        <div className="nav-top">
          <div className="container">
            <div className="nav-top__left">
              <p className="nav-top__left__txt">
                Need help? Call us:
                <a href="tel:+998916341985">(+998) 91 634 19 85</a>
              </p>
            </div>
            <div className="nav-top__right">
              <div className="nav-top__right__item">
                <Link className="location" to="/">
                  <GrLocation className="icon" />
                </Link>
                <p className="nav-top__right__item__txt">
                  <Link to="/">Our store</Link>
                </p>
              </div>
              <div className="nav-top__right__item">
                <FaCartArrowDown className="icon" />
                <p className="nav-top__right__item__txt">
                  <Link to="/">Your orders</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="nav-bottom">
          <div className="container">
            <div className="nav-bottom-wrapper">
              <div className="logo">
                <Link to="/">
                  <img src={Logo} alt="" />
                </Link>
              </div>
              <form
                className={`search ${searchinput ? "formblock" : ""}`}
                onSubmit={(e) => {
                  e.preventDefault();
                  setBtn(true);
                  setSearchInput(false);
                  setTimeout(() => {
                    setBtn(false);
                  }, 0);
                }}
              >
                <input
                  className="search_input"
                  type="text"
                  placeholder="Serach any things"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button>Search</button>
              </form>
              <div className="nav-bottom-right">
                <div
                  className="nav-bottom-right__item"
                  onClick={() => {
                    setSearchInput(true);
                  }}
                >
                  <GoSearch className="icon search-icon" />
                </div>
                <div
                  className={`nav-bottom-right__item ${
                    access ? "dblock" : "dnone"
                  }`}
                  onClick={() => {
                    window.localStorage.clear();
                    window.location.href = "/login";
                  }}
                >
                  <Link>
                    <MdLogout className="icon" />
                    <p className="nav-bottom-right__item">Log out</p>
                  </Link>
                </div>
                <div
                  className={`nav-bottom-right__item ${access ? "dnone" : ""}`}
                >
                  <Link>
                    <RxPerson className="icon" />
                    <p className="nav-bottom-right__item">Sign in</p>
                  </Link>
                </div>
                <div className="nav-bottom-right__item">
                  <Link to="/cart">
                    <RiShoppingCart2Line className="icon" />
                    <p className="nav-bottom-right__item">Cart</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="nav-links">
          <div className="container">
            <div className="nav-links-wrapper">
              <div className="nav-links-left">
                <Link className="category link" to="/filter">
                  Browse categories
                </Link>
                <div className="links">
                  <Link className="link" to="/">
                    Home
                  </Link>
                  <Link className="link" to="/myproducts">
                    My products
                  </Link>
                  <Link className="link">About us</Link>
                </div>
              </div>
              <div className="nav-links-right">
                <p className="nav-links-right-txt">30 Days Free Return</p>
                <div className="burger">
                  <AiOutlineMenu
                    className="icon"
                    onClick={() => setSidelinks(!sidelinks)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`nav-side-links ${sidelinks ? "nav-side-links-open" : ""}`}
        >
          <div className="close">
            <AiOutlineCloseSquare
              className="icon"
              onClick={() => setSidelinks(!sidelinks)}
            />
          </div>
          <div
            className="nav-side-links-items"
            onClick={() => {
              setSidelinks(false);
            }}
          >
            <Link className="side-link">
              <FaCartArrowDown className="icon" />
              <p>Your orders</p>
            </Link>
            <Link className="side-link" to="/">
              <p>Home</p>
            </Link>
            <Link className="side-link" to="/myproducts">
              <p>My products</p>
            </Link>
            <Link className="side-link">
              <p>About us</p>
            </Link>
          </div>
        </div>
      </div>
      {props.children}
    </SearchContext.Provider>
  );
}

export default Nav;
