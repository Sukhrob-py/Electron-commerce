import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./auth.scss";

function OtherInfos() {
  const [errorTxt, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const API = "http://127.0.0.1:8000/user/finish/";
  const set_profile_infos = async () => {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_signup"),
      },
      body: JSON.stringify({
        phone_number: phone,
        sex: sex,
        age: age,
      }),
    });
    const data = await res.json();
    if (data.success == true) {
      localStorage.setItem("access", localStorage.getItem("access_signup"));
      localStorage.removeItem("access_signup");
      window.location.href = "/";
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
            set_profile_infos();
          }}
        >
          <input
            type="text"
            required
            placeholder="phone number"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <input
            type="number"
            required
            placeholder="age"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
          <select
            required
            onChange={(e) => {
              setSex(e.target.value);
            }}
          >
            <option>sex</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
          <button>Finish</button>
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

export default OtherInfos;
