import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Accounts   from './components/admin/Accounts';
import Footer     from './components/Footer';
import Header     from './components/Header';
import Navbar     from './components/Navbar';
import Referees   from './components/admin/Referees';
import Title      from './components/Title';

// Auth Components
import { RequireAdmin, RequireUser } from './requireAuth';

// Context
import TitleProvider, { useTitle } from './contexts/titleContext';
import UserProvider from './contexts/userContext';

// Style
import '@themesberg/flowbite'; // Not sure if it works

function App() {

  return (
    <Router>
      <TitleProvider>
        <UserProvider>
          <Main />
        </UserProvider>
      </TitleProvider>
    </Router>
  );
}

function Main() {
  const [ title ] = useTitle();
  return (
    <div className="App">
      <Navbar />
      <Title title={title} />
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
              <RequireAdmin>
                <Accounts />
              </RequireAdmin> 
            } />
          <Route
            path="/arbitri"
            element={
              <RequireAdmin>
                <Referees />
              </RequireAdmin>
            }
          >
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App;
