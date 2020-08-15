import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import Cookie from "js-cookie";
import "./home.css";

var IsEmpty = true;
export default class users extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("name") === null) {
      props.history.push("/signin");
    }
    this.state = {
      Products: [],
    };
    window.localStorage.removeItem("IsAdded");
  }
  getUsersData() {
    Axios.get("http://localhost:3000/api/products")
      .then((res) => {
        const data = res.data.products;
        if (data.length > 0) {
          IsEmpty = false;
        }
        const products = data.map((u) => (
          <div class=" Column  my-4 z  bg">
            <div class="col-lg-12 col-sm-12col-md-12 z ">
              <p class="text-left p">
                {" "}
                <b>Name :</b> {u.name}
              </p>
              <p class="text-left p">
                {" "}
                <b>Price :</b> ${u.price}
              </p>
              <p class="text-left p">
                {" "}
                <b>Category :</b> {u.category}
              </p>
              <a
                href={
                  "/cart?id=" +
                  u._id +
                  "&name=" +
                  u.name +
                  "&image=" +
                  u.picture +
                  "&category=" +
                  u.category +
                  "&price=" +
                  u.price +
                  "&description=" +
                  u.description
                }
                class="btn btn-success btn-block"
              >
                Add to Cart
              </a>
            </div>
            <div class="col-lg-12 col-sm-12 col-md-12 dis z">
              <img
                src={"http://localhost:3000/" + u.picture}
                width="100%"
                height="800"
              ></img>
              <p> {u.description}</p>
            </div>
          </div>
        ));

        this.setState({
          products,
        });
      })
      .catch((e) => {});
  }
  componentDidMount() {
    this.getUsersData();
  }
  render() {
    return (
      <div class="card py-4 px-4 z">
        <br></br>
        {localStorage.getItem("role") === "admin" ? (
          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class=" col-lg-3 offset-lg-9 col-md-12 col-sm-12">
              <a href="/new_product" class="btn btn-primary btn-block">
                NEW PRODUCT
              </a>
            </div>
            <hr></hr>
          </div>
        ) : (
          ""
        )}
        <div class=" my-4 py-4 Row z">
          {IsEmpty === true ? "NO PRODUCTS AVAILABLE" : this.state.products}
        </div>
      </div>
    );
  }
}
