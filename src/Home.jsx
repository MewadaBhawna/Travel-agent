import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/input');  // Route to input page
  };
  return (<div className="home-container">
   <img 
        src="src/assets/images/Travel-agent-logo.png" 
        alt="Travel Agent Logo" 
        className="logo-image"
      />
    <button className="begin-button" onClick={handleClick}>Let's Begin</button>
  </div>);
};

export default Home;
