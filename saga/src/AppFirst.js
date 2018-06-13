import React, { PropTypes } from 'react'
//import logo from './logo.svg'
//import './App.css'
//<img src={logo} className="App-logo" alt="logo" />
const AppFirst = props => (
  <div className="App">
    <div className="App-header">
      
      <h2></h2>
    </div>
    <section className="App-body">
      {props.children}
    </section>
  </div>
)

AppFirst.propTypes = {
  //children: PropTypes.node,
}

export default AppFirst
