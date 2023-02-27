import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./auth.scss";

function UsernamePassword() {
  const [errorTxt, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");
  const API = "http://127.0.0.1:8000/user/set_password/";
  const set_password = async () => {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_signup"),
      },
      body: JSON.stringify({
        username: username,
        password: password,
        password_confirm: password_confirm,
      }),
    });
    const data = await res.json();
    if (data.success) {
      window.location.href = "/otherinfos";
    } else if (res.status == 401) {
      window.location.href = "/signup";
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
            set_password();
          }}
        >
          <input
            type="text"
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password_confirm"
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
          />
          <button>Submit</button>
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

export default UsernamePassword;
