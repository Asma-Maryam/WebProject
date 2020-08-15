import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import Cookie from "js-cookie";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import "./cart.css";

var id = "";
var name = "";
var category = "";
var price = "";
var description = "";
var image = "";
var items = [];
var cart_count = 0;
var totalAmount = 0;

export default class cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Products: [],
    };
  }

  delete(e) {
    items = JSON.parse(window.localStorage.getItem("cart"));
    items.splice(e, 1);
    window.localStorage.setItem("cart", JSON.stringify(items));
    const total = items.reduce(
      (val, obj) => val + parseInt(obj.quantity, 10),
      0
    );
    cart_count = total;
    totalAmount = items.reduce(
      (val, obj) => val + parseInt(obj.quantity * obj.price, 10),
      0
    );

    const products = items.map((u, i) => (
      <div class="col-lg-12 border col-md-12 col-sm-12 my-4">
        <div class="col-lg-12  py-4 my-4 row col-sm-12 col-md-12">
          <div class="col-lg-12 col-sm-12 col-md-12">
            <p class="text-left p"> {u.name}</p>
            <p class="text-left p">
              {" "}
              <b>Price :</b> ${u.price}
            </p>
            <p class="text-left p">
              {" "}
              <b>Category :</b> {u.category}
            </p>
            <p class="text-left p">
              {" "}
              <b>Quantity :</b> {u.quantity}
            </p>
            <p class="text-left p">
              {" "}
              <b>Sub Total:</b> ${u.subtotal}
            </p>

            <button onClick={(e) => this.delete(i)} class="btn btn-danger">
              remove
            </button>
          </div>
          <div class="col-lg-8 col-sm-12 col-md-12 i">
            <img
              src={"http://localhost:3000/" + u.image}
              width="100%"
              height="500"
            ></img>
            <p>
              {" "}
              <b>Description</b> {u.description}
            </p>
          </div>
        </div>
      </div>
    ));

    this.setState({
      products,
    });
  }

  handleClick(e) {
    e.preventDefault();
    localStorage.removeItem("cart");
    const products = [];
    cart_count = 0;
    this.setState({
      products,
    });
  }

  componentDidMount() {
    let params = queryString.parse(this.props.location.search);
    if (params.id != null) {
      id = params.id;
      name = params.name;
      category = params.category;
      price = params.price;
      image = params.image;
      description = params.description;
      var product = {
        id: id,
        name: name,
        price: price,
        category: category,
        description: description,
        image: image,
        quantity: 1,
        subtotal: price,
      };

      if (localStorage.getItem("cart") == null) {
        if (localStorage.getItem("IsAdded") == null) {
          items.push(product);
          window.localStorage.setItem("cart", JSON.stringify(items));
        }

        window.localStorage.setItem("IsAdded", true);
      } else {
        items = JSON.parse(window.localStorage.getItem("cart"));
        var check_product = items
          .filter((e) => e.id === product.id)
          .map((e) => e);

        if (localStorage.getItem("IsAdded") == null) {
          if (check_product[0] != null) {
            check_product[0].quantity = check_product[0].quantity + 1;
            check_product[0].subtotal =
              check_product[0].quantity * check_product[0].price;
          } else {
            items.push(product);
          }
          window.localStorage.setItem("cart", JSON.stringify(items));
        }

        window.localStorage.setItem("IsAdded", true);
      }
      const totalProducts = items.reduce(
        (val, obj) => val + parseInt(obj.quantity, 10),
        0
      );
      cart_count = totalProducts;
      totalAmount = items.reduce(
        (val, obj) => val + parseInt(obj.quantity * obj.price, 10),
        0
      );
      const products = items.map((u, i) => (
        <div class="col-lg-12 my-4 border col-md-12 col-sm-12">
          <div class="col-lg-12  py-4 my-4 row col-sm-12 col-md-12">
            <div class="col-lg-4 col-sm-12 col-md-12">
              <p class="text-left"> {u.name}</p>
              <p class="text-left">
                {" "}
                <b>Price :</b> ${u.price}
              </p>
              <p class="text-left">
                {" "}
                <b>Category :</b> {u.category}
              </p>
              <p class="text-left">
                {" "}
                <b>Quantity :</b> {u.quantity}
              </p>
              <p class="text-left">
                {" "}
                <b>Sub Total:</b> ${u.subtotal}
              </p>

              <button onClick={(e) => this.delete(i)} class="btn btn-danger">
                remove
              </button>
            </div>
            <div class="col-lg-8 col-sm-12 col-md-12">
              <img
                src={"http://localhost:3000/" + u.image}
                width="100%"
                height="auto"
              ></img>
              <p>
                {" "}
                <b>Description</b> {u.description}{" "}
              </p>
            </div>
          </div>
        </div>
      ));
      this.setState({
        products,
      });
    }
  }
  render() {
    return (
      <div class="card-header px-4">
        <h4 class="p">
          <b>CART : {cart_count}</b>
        </h4>
        <br></br>
        <div class="row flex">
          <div class="col-lg-6 flex row col-md-12 col-sm-12">
            <div class=" col-lg-3 col-md-12 col-sm-12">
              <a class="btn btn-primary btn-block" href="home">
                continue
              </a>
            </div>
            <div class=" col-lg-3 col-md-12 col-sm-12">
              <button
                class="btn btn-danger btn-block"
                onClick={(e) => this.handleClick(e)}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        <br></br>
        <div>
          <div class="row">
            <div class=" col-lg-12 row col-md-12 col-sm-12">
              <div class="scroll-v border  col-lg-8 col-md-12 col-sm-12">
                {id != undefined ? this.state.products : ""}
              </div>
              <div class="border col-lg-4 col-md-12 col-sm-12">
                <div class="bg-white border mx-4 my-4">
                  <h3 class="text-center">
                    {" "}
                    <b>Summary</b>{" "}
                  </h3>
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="space-between row col-lg-12 col-md-12 col-sm-12">
                      <b>Total Products:</b>
                      <label>{cart_count}</label>
                    </div>
                    <div class="space-between row col-lg-12 col-md-12 col-sm-12">
                      <b>Total Amount:</b>
                      <label>${totalAmount}</label>
                    </div>
                    {cart_count > 0 ? (
                      <div class="col-lg-12 col-md-12 col-sm-12 py-4">
                        <a
                          class="btn btn-warning btn-block"
                          href={
                            "/shipping?totalAmount=" +
                            totalAmount +
                            "&totalItems=" +
                            cart_count
                          }
                        >
                          {" "}
                          Place order{" "}
                        </a>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
