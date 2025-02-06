import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <img 
        src="src/assets/images/Travel-agent-logo.png" 
        alt="Travel Agent Logo" 
        className="logo-image"
      />
      <button className="begin-button" onClick={() => navigate("/input")}>
        Begin Your Journey
      </button>
    </div>
  );
};

export default Home;
