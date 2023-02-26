import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AddProduct() {
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState("");
  const [desc, setDesc] = useState("");
  const [brand, setBrand] = useState("");
  const [cat, setCat] = useState("");
  const API = "http://127.0.0.1:8000/products/create/";
  const set_product = async (API) => {
    let dataa = new FormData();
    dataa.append("title", title);
    dataa.append("cost", cost);
    dataa.append("desc", desc);
    dataa.append("photo", photo);
    dataa.append("brand", brand);
    dataa.append("category", cat);
    const res = await fetch(API, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      body: dataa,
    });
    const data = await res.json();
    if (res.status == 201 && data) {
      window.location.href = "/myproducts";
    } else if (res.status == 401) {
      window.location.href = "/login";
    } else {
      window.alert("something wrong pease try again!");
      window.location.href = "/";
    }
  };
  useEffect(() => {
    // get_product(API);
  }, []);
  return (
    <div className="auth update-prod">
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          set_product(API);
        }}
      >
        <input
          type="text"
          placeholder="title"
          value={title}
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="cost"
          value={cost}
          required
          onChange={(e) => {
            setCost(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="desc"
          value={desc}
          required
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <select
          required
          placeholder="category"
          onChange={(e) => {
            setCat(e.target.value);
          }}
        >
          <option value="">category</option>
          <option value="laptop">Laptop</option>
          <option value="camera">Camera</option>
          <option value="tablet">Tablet</option>
          <option value="headphones">Headphones</option>
          <option value="phone">Phone</option>
          <option value="mouse">Mouse</option>
          <option value="console">Console</option>
          <option value="other">Other</option>
        </select>
        <select
          required
          placeholder="brand"
          onChange={(e) => {
            setBrand(e.target.value);
          }}
        >
          <option value="">brand</option>
          <option value="samsung">samsung</option>
          <option value="apple">apple</option>
          <option value="lg">lg</option>
          <option value="sony">sony</option>
          <option value="hp">hp</option>
          <option value="panasonic">panasonic</option>
          <option value="huawei">huawei</option>
          <option value="xiaomi">xiaomi</option>
          <option value="nokia">nokia</option>
          <option value="lenovo">lenovo</option>
          <option value="other">other</option>
        </select>
        <input
          type="file"
          required
          onChange={(e) => {
            setPhoto(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        />
        <button>Submit</button>
        <div className="link">
          <Link className="link__item" to="/myproducts">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
