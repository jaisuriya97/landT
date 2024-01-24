import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function Welcome() {
  const location = useLocation();
  const userData = location.state?.user;

  if (!userData) {
    return (
      <div>
        <p>Error: User data not found. Please <Link to="/signup">sign up</Link>.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome, {userData.name}!</h2>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default Welcome;
