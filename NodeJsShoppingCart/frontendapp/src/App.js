import React, { Component, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./upload.js";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter, Route, Link, withRouter } from "react-router-dom";
import signup from "./screens/signup";
import signin from "./screens/signin";
import home from "./screens/home";
import signout from "./screens/signout";
import new_product from "./screens/new_product";
import cart from "./screens/cart";
import shipping from "./screens/shipping";
import pay from "./screens/payment";
import AK from "../src/LOGO.png";
import cover from "../src/cover.png";
import cover2 from "../src/cover2.png";
import cover3 from "../src/cover3.png";

import a1 from "../src/a1.png";
import a2 from "../src/a2.png";
import a3 from "../src/a3.png";
import a4 from "../src/a4.png";
import a5 from "../src/a5.png";
import a6 from "../src/a6.png";

var username = "";
var role = "";

class App extends Component {
  constructor(props) {
    super(props);
    username = localStorage.getItem("name");
    role = localStorage.getItem("role");
  }

  handleClick(e) {
    localStorage.clear();
    this.props.history.push("/home");
    window.location.reload();
  }

  componentDidMount() {}
  render() {
    return (
      <BrowserRouter>
        <div>
          <nav class="nav-style navbar navbar-expand-lg NAV ">
            <div class="flex">
              <img
                src={AK}
                alt=""
                className="img"
                width="200px"
                height="200px"
              ></img>
              <a class="navbar-brand AK" href="#">
                Artistic Kyuubi
              </a>

              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              {username ? (
                <div class="collapse navbar-collapse HC" id="navbarNav">
                  <ul class="navbar-nav">
                    <li class="nav-item">
                      <a class="nav-link" href="home">
                        Home <span class="sr-only">(current)</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="cart">
                        Cart
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>

            <div class="flex  collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ">
                {username ? (
                  <li>
                    <ul class="nav-style Log">
                      <li class="nav-item active">
                        <a class="nav-link username">username : {username}</a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          onClick={(e) => this.handleClick(e)}
                          href="#"
                        >
                          {" "}
                          Log off
                        </a>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li>
                    <ul class="nav-style SISU">
                      <li class="nav-item active">
                        <a class="nav-link" href="signup">
                          Sign up <span class="sr-only">(current)</span>
                        </a>
                      </li>
                      <li class="nav-item active">
                        <a class="nav-link" href="signin">
                          Sign in <span class="sr-only">(current)</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </nav>
          <br></br>
          <br></br>

          <main class="container">
            <div className="content" id="c">
              <div id="demo" class="carousel slide" data-ride="carousel">
                <ul class="carousel-indicators">
                  <li data-target="#demo" data-slide-to="0" class="active"></li>
                  <li data-target="#demo" data-slide-to="1"></li>
                  <li data-target="#demo" data-slide-to="2"></li>
                </ul>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img
                      src={cover}
                      alt=""
                      className="img"
                      width="200px"
                      height="200px"
                    ></img>
                  </div>
                  <div class="carousel-item">
                    <img
                      src={cover2}
                      alt=""
                      className="img"
                      width="200px"
                      height="200px"
                    ></img>
                  </div>
                  <div class="carousel-item">
                    <img
                      src={cover3}
                      alt=""
                      className="img"
                      width="200px"
                      height="200px"
                    ></img>
                  </div>
                </div>
                <a class="carousel-control-prev" href="#demo" data-slide="prev">
                  <span class="carousel-control-prev-icon"></span>
                </a>
                <a class="carousel-control-next" href="#demo" data-slide="next">
                  <span class="carousel-control-next-icon"></span>
                </a>
              </div>

              <div class="container-fluid ts">
                <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-12">
                    <img
                      src={AK}
                      alt=""
                      className="img"
                      width="100px"
                      height="100px"
                    ></img>
                    <h1>Trending Uploads</h1>
                  </div>
                </div>
              </div>

              <Route path="/signup" component={signup} />
              <Route path="/shipping" component={shipping} />

              <Route path="/signin" component={signin} />
              <Route path="/home" component={home} />

              <Route path="/signout" component={signout} />
              <Route path="/new_product" component={new_product} />
              <Route path="/cart" component={cart} />
              <Route path="/pay" component={pay} />

              <div class="container-fluid cu">
                <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-12">
                    <h2>
                      <b>
                        We Are Community of 30k + creative artists, doodlers and
                        friends
                      </b>
                    </h2>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-2">
                    <img
                      src={a1}
                      alt=""
                      className="img"
                      width="100px"
                      height="100px"
                    ></img>
                    <div class="Effect"></div>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-2">
                    <img
                      src={a2}
                      alt=""
                      className="img"
                      width="100px"
                      height="100px"
                    ></img>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-2">
                    <img
                      src={a3}
                      alt=""
                      className="img"
                      width="100px"
                      height="100px"
                    ></img>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-2">
                    <img
                      src={a4}
                      alt=""
                      className="img"
                      width="100px"
                      height="100px"
                    ></img>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-2">
                    <img
                      src={a5}
                      alt=""
                      className="img"
                      width="100px"
                      height="100px"
                    ></img>
                  </div>

                  <div class="col-sm-12 col-md-6 col-lg-2">
                    <img
                      src={a6}
                      alt=""
                      className="img"
                      width="100px"
                      height="100px"
                    ></img>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-12"></div>
                </div>
              </div>
            </div>
            <div class="container-fluid ft">
              <div class="row">
                <div class="col-sm-12 col-md-7 col-lg-4">
                  <img
                    src={AK}
                    alt=""
                    className="img"
                    width="100px"
                    height="100px"
                  ></img>
                  <h1>Artistic Kyuubi </h1>
                </div>
              </div>
            </div>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}
export default withRouter(App);
