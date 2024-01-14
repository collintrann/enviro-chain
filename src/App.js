import React from "react";
import { Routes, Route } from "react-router-dom";
// import { processCSV } from './helpers';  // TODO: Import your helper functions
import UserProfile from "./components/UserProfile";
import Upload from "./components/Upload";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import MainNavigation from "./MainNavigation";

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      {/* <header className="App-header">
      </header> */}
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/view-profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
