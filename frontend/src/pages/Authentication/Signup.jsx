import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./auth.scss";

function Signup() {
  const [errorTxt, setError] = useState("");
  const [email, setEmail] = useState("");
  const API = "http://127.0.0.1:8000/user/signup/";
  const signup = async () => {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await res.json();
    if (res.status == 201 && res.ok) {
      localStorage.setItem("access_signup", data.access);
      window.location.href = "/emailverify";
    } else if (data.email) {
      setError(data.email);
    } else {
      setError(data.message);
    }
  };
  return (
    <>
      <div className={`error-box ${errorTxt ? "dblock" : ""}`}>
        <h3 className="error-txt">{errorTxt}</h3>
      </div>
      <div className="auth">
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            signup();
          }}
        >
          <input
            type="email"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button>Get code</button>
          <div className="link">
            <Link className="link__item" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
