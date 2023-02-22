import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./auth.scss";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const API = "http://127.0.0.1:8000/user/login/";
  const login = async () => {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username_email_phone: username,
        password: password,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.success) {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("email", data.email);
      localStorage.setItem("phone_number", data.phone_number);
      localStorage.setItem("username", data.username);
      window.location.href = "/";
    } else {
      window.alert("password or username is incorrect");
    }
  };
  return (
    <div className="auth">
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <input
          type="text"
          placeholder="username or email or phonenumber"
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
        <button>Login</button>
        <div className="link">
          <Link className="link__item" to="/signup">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
