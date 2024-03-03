import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNav from "./components/common/mainNav";
import Home from "./components/pages/Home";
import Update from "./components/pages/Update";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import "./App.css"

function App() {
  return (
    <div className="App">
      <MainNav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/add" element={<Add />} /> */}
          <Route path="/update" element={<Update />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
