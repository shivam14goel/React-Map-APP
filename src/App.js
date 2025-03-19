import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Searchbar from './components/searchbar';
import Details from './components/details';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [userData, setUserData] = useState({
    firstName: '',
    mobileNumber: ''
  });

  const handleFormSubmit = (formData) => {
    setUserData(formData);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link to="/" className="navbar-brand">Home</Link>
            <div className="navbar-nav">
              {userData.firstName && (
                <Link to="/map" className="nav-link">Map</Link>
              )}
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Searchbar onSubmit={handleFormSubmit} />} />
          <Route path="/map" element={<Details userData={userData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
