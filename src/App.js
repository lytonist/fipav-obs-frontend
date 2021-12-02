import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Header from './components/Header';
import Home from './routes/home';
import Navbar from './components/Navbar';
import Title from './components/Title';
import Footer from './components/Footer';

// Auth Components
//import AuthProvider from './components/auth/AuthProvider';
//import RequireAuth from './components/auth/RequireAuth';

// Context
import UserProvider from './userContext';

// Style
import '@themesberg/flowbite'; // Not sure if it works

function App() {

  return (
    <Router>
      <UserProvider>
        <Main />
      </UserProvider>
    </Router>
  );
}

function Main() {

  return (
<   div className="App">
      <Navbar />
      <Title title="Portale Osservatori" />
      <Routes>
        <Route path="/" element={ <Header /> } />
        <Route path="/home" element={ <Home /> } />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
