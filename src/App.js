import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import StatsPage from "./components/StatsPage";
import LoginPage from './components/LoginPage';
import FAQPage from './components/FAQPage';
import SignupPage from  './components/SignupPage';
import ContactUsPage from './components/ContactUsPage';
import UserDashboard from "./components/UserDashboard";
import JobsPage from "./components/Jobspage";
import CommunityPage from "./components/pages/CommunityPage";
import CommunityCreate from "./components/CommunityCreate";
import CommunityView from "./components/pages/CommunityView";
import CommunityDetails from "./components/CommunityDetails";



const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/jobs" element={<JobsPage />} /> 
          <Route path="/communities" element={<CommunityPage />} />
          <Route path="/create-community" element={<CommunityCreate />} />
          <Route path="/community/:id" element={<CommunityView />} />
          <Route path="/communities/:id" element={<CommunityDetails/>} />

        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
