import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
//import logo from './logo.svg';

// Style
//import './App.css';
import '@themesberg/flowbite'; // Not sure if it works

function App() {
  return (
    <div className="App bg-gradient-to-r from-blue-600 to-blue-400">
      <Navbar />
      <Header />
      <Footer />
      { /*
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      */ }
    </div>
  );
}

export default App;
