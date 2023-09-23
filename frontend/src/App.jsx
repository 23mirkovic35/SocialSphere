import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import GetStarted from "./pages/GetStarted";
import MySphere from "./pages/MySphere";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Friends from "./components/Friends";
import ImageGallery from "./pages/ImageGallery";
import ViewPost from "./components/ViewPost";
import Groups from "./pages/Groups";
import GroupPage from "./pages/GroupPage";
import Messages from "./pages/Messages";
import CallRoom from "./components/CallRoom";
import Settings from "./pages/Settings";
import RatePage from "./pages/RatePage";
import AllNotifications from "./pages/AllNotifications";

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
            <Route path="friends/:username" element={<Friends />} />
            <Route path="profile/:username" element={<Profile />} />
            <Route path="images/:username" element={<ImageGallery />} />
            <Route path="post/:postId" element={<ViewPost />} />
            <Route path="groups/:username" element={<Groups />} />
            <Route path="group/:groupId" element={<GroupPage />} />
            <Route path="messages/:username" element={<Messages />} />
            <Route path="meeting/:socketID" element={<CallRoom />} />
            <Route path="settings" element={<Settings />} />
            <Route path="rateus" element={<RatePage />} />
            <Route
              path="notifications/:username"
              element={<AllNotifications />}
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
