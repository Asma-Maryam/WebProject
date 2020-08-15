import React, { Component } from "react";
import { Link, withRouter } from "react";
import AK from "../src/LOGO.png";

export default class Navbar extends Component {
  Signout(e) {
    e.preventDefualt();
    localStorage.clear();
    this.props.history.push("/signin");
  }

  render() {
    const routerlink = (
      <ul class="nav-style">
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
    );
    const userlink = (
      <ul class="nav-style">
        <li class="nav-item active">
          <a class="nav-link"></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" onClick={this.Signout.bind(this)} href="signout">
            signout <span class="sr-only">(current)</span>
          </a>
        </li>
      </ul>
    );

    return (
      <nav class="nav-style navbar navbar-expand-lg navbar-dark bg-dark ">
        <div class="flex">
          <img
            src={AK}
            alt=""
            className="img"
            width="100px"
            height="100px"
          ></img>
          <a class="navbar-brand" href="#">
            Artistic kyuubi
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

          <div class="collapse navbar-collapse" id="navbarNav">
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
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link disabled"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  Disabled
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex  collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ">
            {localStorage.usertoken ? userlink : routerlink}
          </ul>
        </div>
      </nav>
    );
  }
}
