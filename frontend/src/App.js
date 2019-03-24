import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Contact from './components/Contact';
//import Contactform from './components/Contactform';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Contact />
        <hr></hr>
      </div>
    );
  }
}

export default App;
