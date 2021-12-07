import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Accounts   from './components/admin/Accounts';
import Footer     from './components/Footer';
import Header     from './components/Header';
import Navbar     from './components/Navbar';
import Title      from './components/Title';

// Auth Components
import { RequireAdmin, RequireUser } from './requireAuth';

// Context
import UserProvider from './userContext';
import { useAuth } from './userContext';

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
  const [ user, setUser ] = useAuth();
  return (
    <div className="App">
      <Navbar />
      <Title title="Portale Osservatori" />
      <div className="bg-gradient-to-r from-blue-500 to-blue-400">
        <Routes>
          <Route
            path="/"
            element={ 
              <Header /> 
            } />
          <Route
            path="/accounts"
            element={ 
              <RequireUser>
                <Accounts />
              </RequireUser> 
            } />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App;
