import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import "./updatemyproduct.scss";

function UpdateMyProduct() {
  const { yuid } = useParams();
  const [product, setProduct] = useState("");
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState("");
  const [desc, setDesc] = useState("");
  const API = `http://127.0.0.1:8000/products/myproducts/${yuid}`;
  const get_product = async (API) => {
    const res = await fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    });
    const data = await res.json();
    if (res.status == 200 && data) {
      setProduct(data);
      setCost(data.cost);
      setTitle(data.title);
      setDesc(data.desc);
      setPhoto(data.photo);
    } else if (res.status == 401) {
      window.location.href = "/login";
    } else {
      window.alert("something wrong pease try again!");
      window.location.href = "/";
    }
  };
  const set_product = async (API) => {
    let dataa = new FormData();
    dataa.append("title", title);
    dataa.append("cost", cost);
    dataa.append("desc", desc);
    if (photo.name) {
      dataa.append("photo", photo);
      const res = await fetch(API, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
        body: dataa,
      });
      const data = await res.json();
      if (res.status == 200 && data) {
        window.location.href = "/myproducts";
      } else if (res.status == 401) {
        window.location.href = "/login";
      } else {
        window.alert("something wrong pease try again!");
        window.location.href = "/";
      }
    } else {
      const res = await fetch(API, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
        body: dataa,
      });
      const data = await res.json();
      if (res.status == 200 && data) {
        window.location.href = "/myproducts";
      } else if (res.status == 401) {
        window.location.href = "/login";
      } else {
        window.alert("something wrong pease try again!");
        window.location.href = "/";
      }
    }
  };
  useEffect(() => {
    get_product(API);
  }, []);
  if (product) {
    return (
      <div className="auth update-prod">
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            set_product(API);
          }}
        >
          <input className="img" type="image" src={photo} />
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="cost"
            value={cost}
            onChange={(e) => {
              setCost(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="desc"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
          <input
            type="file"
            onChange={(e) => {
              setPhoto(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
          />
          <button>Update</button>
          <div className="link">
            <Link className="link__item" to="/myproducts">
              Back
            </Link>
          </div>
        </form>
      </div>
    );
  } else {
    <div className="auth">
      <form>no product!</form>
    </div>;
  }
}

export default UpdateMyProduct;
