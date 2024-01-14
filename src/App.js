import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import { processCSV } from './helpers';  // TODO: Import your helper functions
import './App.css';
import UserProfile from './components/UserProfile';
import Upload from './components/Upload';
import Home from './components/Home';
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/view-profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
