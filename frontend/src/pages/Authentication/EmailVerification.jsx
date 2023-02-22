import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./auth.scss";

function EmailVerification() {
  const [code, setCode] = useState("");
  const API = "http://127.0.0.1:8000/user/verify/";
  const verify = async () => {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_signup"),
      },
      body: JSON.stringify({
        code: code,
      }),
    });
    const data = await res.json();
    if (res.status == 200 && res.ok) {
      localStorage.setItem("access_signup", data.access);
      window.location.href = "/usernamepassword";
    } else if (res.status == 401) {
      window.alert(data.detail);
      window.location.href = "/signup";
    } else {
      window.alert(data.message);
    }
  };
  return (
    <div className="auth">
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          verify();
        }}
      >
        <input
          type="text"
          placeholder="code"
          onChange={(e) => {
            setCode(e.target.value);
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
  );
}

export default EmailVerification;
