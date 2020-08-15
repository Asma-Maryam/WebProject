import  { Redirect } from 'react-router-dom'
import  { login } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
import queryString from 'query-string';

import React, {Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios'
import Cookie from 'js-cookie';


var Address="";
var Country="";
var City="";
var Phone="";


export default class users extends Component {
 
  constructor(props) {
        super(props);
        if(localStorage.getItem('name') === null)
        {
          props.history.push("/signin");
        }
        this.state = {
          username: '',
          role: '',
        };
      }

      componentDidMount()
      {
        let params = queryString.parse(this.props.location.search)
        localStorage.setItem('TotalItems', params.totalItems)
        localStorage.setItem('TotalAmount', params.totalAmount)
            
      }
      setAddress(e) {
        Address=e;
    }      
    setCountry(e) {
        Country=e;
    }      
    setCity(e) {
        City=e;
    }      
    
    setPhone(e) {
      Phone=e;
  }        

  handleToken(token , addressess)
{
    console.log(token)
}

  handleSubmit = e => 
    {
        e.preventDefault();
        localStorage.setItem('Address',Address)
        localStorage.setItem('Country',Country)
        localStorage.setItem('City',City)
        localStorage.setItem('Phone',Phone)

        this.props.history.push("/pay");
    
    }
    

    render() {

        return (
         <div class="row justify-content-center"  >  
          <form onSubmit={this.handleSubmit}   class="jumbotron col-lg-6 col-md-12 col-sm-12" >
            <ul class="form" >
              <li>
                <h2>Shipping Details</h2>
              </li>
             <li>
                <label htmlFor="email">
                  Address
                </label>
                <br/>
                <textarea class="form-control" rows="5" name="email" id="email" onChange={(e) => this.setAddress(e.target.value)} required ></textarea>
              </li>
              <li>
                <label htmlFor="city">City</label>
                <br/>
                <input type="text" class="form-control" id="city" name="city" onChange={(e) => this.setCity(e.target.value)}  required>
                </input>
              </li>
              <li>
                <label htmlFor="country">Country</label>
                <br/>
                <input type="text" class="form-control" id="country" name="country" onChange={(e) => this.setCountry(e.target.value)}  required>
                </input>
              </li>
              <li>
                <label htmlFor="country">Phone</label>
                <br/>
                <input type="phone" class="form-control" id="phone" name="phone" onChange={(e) => this.setPhone(e.target.value)}  required>
                </input>
              </li>
              <li>
              <br/>
                <button  type="submit" class="btn btn-primary">Next</button>
              </li>
              <li>
              </li>
      
            </ul>
          </form>
        </div>
        )
    }
}
