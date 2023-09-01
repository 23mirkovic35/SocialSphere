import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import GetStarted from "./pages/GetStarted";
import MySphere from "./pages/MySphere";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="get-started/:username" element={<GetStarted />} />
          <Route path="mySphere" element={<MySphere />}>
            <Route path="" element={<Feed />} />
            <Route path="profile/:username" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
