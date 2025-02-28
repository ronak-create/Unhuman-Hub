import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from "./components/LandingPage";
import TextService from "./services/TextService";
import ImageService from "./services/ImageService";
import VideoService from "./services/VideoService";
import AudioService from "./services/AudioService";
import AnalyticsAutomation from "./services/AnalyticsAutomation";

// PrivateRoute using new structure in React Router v6
const PrivateRoute = () => {
  const { user } = useContext(AuthContext);
  return user ? <AuthProvider><Dashboard /></AuthProvider> : <Login />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> {/* Updated Route with 'element' */}
        <Route path="/dashboard" element={<PrivateRoute/>} /> {/* Updated PrivateRoute */}
        <Route path="/services/text-based-services" element={<TextService />} />
        <Route path="/services/image-based-services" element={<ImageService />} />
        <Route path="/services/video-based-services" element={<VideoService />} />
        <Route path="/services/audio-based-services" element={<AudioService />} />
        <Route path="/services/analytics-automation" element={<AnalyticsAutomation />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
