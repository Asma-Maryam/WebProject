import  { Redirect } from 'react-router-dom'
import  { login } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import React, {Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios'
import Cookie from 'js-cookie';

export default class pay extends Component {
 
  constructor(props) {
        super(props);
        if(localStorage.getItem('name') === null)
        {
          props.history.push("/signin");
        }
      
      }

      componentDidMount(){
      }
  
  handleToken(token , addressess)
{
    alert("You payed successfully");
}

    render() {

        return (
         <div class="row justify-content-center"  >  
                
            <StripeCheckout 
              stripeKey="pk_test_51HEesoLqC7uthaIRje1bPBx6ZoTxYHwx7VRZd4M4cSwUUfjtGwNDMYrlZuNHXLKP8w8J7Hw4EddshIfjIwYfoorU00n7E1aGgC"
              token={this.handleToken}
              billingAddress
              shippingAddress
              amount={localStorage.getItem('TotalAmount')}        
            />

        </div>
        )
    }
}
