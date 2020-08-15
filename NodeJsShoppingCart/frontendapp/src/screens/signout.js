import React from 'react'
import  { Redirect } from 'react-router-dom'

function Signout(props) {
  localStorage.clear();
  return <Redirect to='/signin'/>
}
  export default Signout;