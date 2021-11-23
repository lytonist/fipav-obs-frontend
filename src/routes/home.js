import React from 'react';

// Components
import Navbar from './components/Navbar';
import Title from './components/Title';
import Footer from './components/Footer';

// Style
import '@themesberg/flowbite'; // Not sure if it works

const Home = () => {
  return (
    <div className="Home">
      <Navbar />
      <Title />
      <div>Questa è la Home</div>
      <Footer />
    </div>
  );
}

export default Home;
