import React from "react";

const Alert = ({ message, onClose, isSuccess = false }) => {
  return (
    <div className="alert-container">
      <div className="alert-content" style={{ borderLeft: isSuccess ? "4px solid #4bdcb0" : "4px solid #ff4444" }}>
        <p className="alert-title">{message}</p>
        <button 
          className="alert-close-btn"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Alert; 