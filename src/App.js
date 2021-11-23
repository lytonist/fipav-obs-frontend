import React from 'react';

// Components
import Navbar from './components/Navbar';
import Title from './components/Title';
import Header from './components/Header';
import Footer from './components/Footer';

// Style
import '@themesberg/flowbite'; // Not sure if it works

function App() {
  return (
    <div className="App">
      <Navbar />
      <Title />
      <Header />
      <Footer />
    </div>
  );
}

export default App;
