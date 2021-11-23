import React from 'react';
import { Outlet } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Title from './components/Title';
import Footer from './components/Footer';

// Style
import '@themesberg/flowbite'; // Not sure if it works

function App() {
  return (
    <div className="App">
      <Navbar />
      <Title title="Portale Osservatori" />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
