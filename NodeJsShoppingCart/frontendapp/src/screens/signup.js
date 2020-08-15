import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";

function CreateAdmin() {
  const url = "http://localhost:3000/api/register";
  const user = {
    name: "admin",
    email: "admin@gmail.com",
    password: "1234567",
    role: "admin",
  };
  try {
    Axios.post(url, user)
      .then((res) => {})
      .catch((e) => {
        //handle your errors
      });
  } catch (e) {
    console.log(e);
  }
}

function Signup(props) {
  CreateAdmin();
  const [UserName, setName] = useState("");
  const [UserEmail, setEmail] = useState("");
  const [UserPassword, setPassword] = useState("");
  const [UserrePassword, setRePassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/api/register";
    if (UserPassword === UserrePassword) {
      const user = {
        name: UserName,
        email: UserEmail,
        password: UserPassword,
        role: "user",
      };
      try {
        Axios.post(url, user)
          .then((res) => {
            localStorage.setItem("role", res.data.message.role);
            localStorage.setItem("name", res.data.message.name);
            localStorage.setItem("email", res.data.message.email);
            props.history.push("/home");
            window.location.reload();
          })
          .catch((e) => {
            console.log(e);
            //handle your errors
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("password do not match");
    }
  };
  return (
    <div class="row justify-content-center">
      <form
        onSubmit={submitHandler}
        class="jumbotron col-lg-6 col-md-12 col-sm-12"
      >
        <ul class="form">
          <li>
            <h2>Create Account</h2>
          </li>
          <li class="form-group">
            <label htmlFor="name">Name</label>
            <br />
            <input
              class="form-control"
              type="name"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              required
            ></input>
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <br />
            <input
              class="form-control"
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </li>
          <li>
            <label htmlFor="rePassword">Re-Enter Password</label>
            <br />
            <input
              type="password"
              class="form-control"
              id="rePassword"
              name="rePassword"
              onChange={(e) => setRePassword(e.target.value)}
              required
            ></input>
          </li>
          <li>
            <br />
            <button type="submit" class="btn btn-primary">
              Register
            </button>
          </li>
          <li></li>
        </ul>
      </form>
    </div>
  );
}
export default Signup;
