import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { CiLocationOn } from "react-icons/ci";
import { FaCartArrowDown } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { AiOutlineCloseSquare, AiOutlineMenu } from "react-icons/ai";
import { RxPerson } from "react-icons/rx";
import { RiShoppingCart2Line } from "react-icons/ri";

import Logo from "../../../assets/logo.png";

import "./nav.scss";

function Nav() {
  const [sidelinks, setSidelinks] = useState(false);
  return (
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
              <Link className="location">
                <CiLocationOn className="icon" />
              </Link>
              <p className="nav-top__right__item__txt">
                <Link to="">Our store</Link>
              </p>
            </div>
            <div className="nav-top__right__item">
              <FaCartArrowDown className="icon" />
              <p className="nav-top__right__item__txt">
                <Link>Your orders</Link>
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
            <form className="search">
              <input type="text" placeholder="Serach any things" />
              <button>Search</button>
            </form>
            <div className="nav-bottom-right">
              <div className="nav-bottom-right__item">
                <GoSearch className="icon search-icon" />
              </div>
              <div className="nav-bottom-right__item">
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
                <Link className="link">My products</Link>
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
        <div className="nav-side-links-items">
          <Link className="side-link">
            <FaCartArrowDown className="icon" />
            <p>Your orders</p>
          </Link>
          <Link className="side-link">
            <p>Home</p>
          </Link>
          <Link className="side-link">
            <p>My products</p>
          </Link>
          <Link className="side-link">
            <p>About us</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;
