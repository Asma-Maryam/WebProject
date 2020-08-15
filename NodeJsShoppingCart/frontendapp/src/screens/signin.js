import  { Redirect } from 'react-router-dom'
import  { login } from 'react-router-dom'


import React, {Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios'
import Cookie from 'js-cookie';


var UserEmail="";
var UserPassword="";

export default class users extends Component {
 
  constructor(props) {
        super(props);

        this.state = {
          username: '',
          role: '',
        };
      }

      componentDidMount(){
      }
      setEmail(e) {
        UserEmail=e;
    }      
    setPassword(e) {
      UserPassword=e;
  }        


  handleSubmit = e => 
    {
      e.preventDefault();
      const url = 'http://localhost:3000/api/signin';
      const user =
      {
          email:UserEmail,
          password:UserPassword,
      }
    
          Axios.post(url, user).then((res) => 
          {
            this.setState({
              username:res.data.message[0].name
            })
            localStorage.setItem('role', res.data.message[0].role);
            localStorage.setItem('name', res.data.message[0].name);
            localStorage.setItem('email', res.data.message[0].email);
            this.props.history.push("/home");
            window.location.reload();
          }).catch((e) => {
            alert(e.response.data.message);
              //handle your errors
          });
      
    }
    

    render() {

        return (
         <div class="row justify-content-center"  >
          <form onSubmit={this.handleSubmit}   class="jumbotron col-lg-6 col-md-12 col-sm-12" >
            <ul class="form" >
              <li>
                <h2>Sign in Account</h2>
              </li>
             <li>
                <label htmlFor="email">
                  Email
                </label>
                <br/>
                <input class="form-control" type="email" name="email" id="email" onChange={(e) => this.setEmail(e.target.value)} required >
                </input>
              </li>
              <li>
                <label htmlFor="password">Password</label>
                <br/>
                <input type="password" class="form-control" id="password" name="password" onChange={(e) => this.setPassword(e.target.value)}  required>
                </input>
              </li>
             
              <li>
              <br/>
                <button  type="submit" class="btn btn-primary">Sign in</button>
              </li>
              <li>
              </li>
      
            </ul>
          </form>
        </div>
        )
    }
}
