import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchUserData } from '../util';

const Dashboard = () => {
  const location = useLocation();
  const token = location.state.token;
  const [user, setUser] = useState();

  useEffect(() => {
    const getUserData = async () => {
      if (token) {
        const userData = await fetchUserData({ token });
        setUser(userData);
      }
    };

    getUserData();
  }, [token]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Services Page {user?.email}</h1>
      <p className="text-lg">
        This is a simple React application with a navbar and routing using React Router. Feel free to explore the other
        pages using the links in the navbar.
      </p>
    </div>
  );
};

export default Dashboard;
