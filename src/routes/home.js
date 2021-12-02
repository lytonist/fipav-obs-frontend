import React from 'react';

// Auth Context
import { useAuth } from '../userContext';

const Home = () => {
  const [ user ] = useAuth();

  if (user) {
    return (
      <main className="Home">
        <div>Benvenuto { user }!</div>
      </main>
    );
  } else {
      return (
        <div>Not Authorized</div>
      )
  }

}

export default Home;
