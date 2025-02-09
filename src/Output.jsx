import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Alert from "./Alert";
const Output = (props) => {
  console.log(props);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Function to handle showing alert
  const handleShowAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    // Auto-hide alert after 5 seconds
    setTimeout(() => setShowAlert(false), 5000);
  };

  const location = useLocation();
  const formData = location.state?.formData || {};

  return (
    <div className="input-container">
      {showAlert && (
        <Alert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
          isSuccess={true}
        />
      )}
      <div className="centered-form">
        {/* Main Title */}
        <h1 className="trip-title">Your Trip</h1>

        {/* Date Section */}
        <div className="form-group">
          <label className="bold-label">Travel Dates</label>
          <div className="input-field display-field">
            {formData.fromDate} to {formData.toDate}
          </div>
        </div>

        {/* Cities Section */}
        <div className="form-group">
          <label className="bold-label">Selected Cities</label>
          <div className="input-field display-field">
            {formData.flyingFrom} → {formData.flyingTo}
          </div>
        </div>

        {/* Weather Section */}
        <div className="form-group">
          <label className="bold-label">Weather Forecast</label>
          <div className="input-field display-field">
            <p>
              <strong>{formData.flyingFrom}:</strong> 18°C (64°F) - Partly
              cloudy
            </p>
            <p>
              <strong>{formData.flyingTo}:</strong> 22°C (72°F) - Sunny with
              clear skies
            </p>
          </div>
        </div>

        {/* Flights Section */}
        <div className="form-group">
          <label className="bold-label">Flights</label>
          <div className="input-field display-field flex-between">
            <div>
              <p>
                <strong>Outbound:</strong> {formData.flyingFrom} →{" "}
                {formData.flyingTo}
              </p>
              <p className="text-muted">Duration: 7h 30m • Direct Flight</p>
            </div>
            <button
              className="submit-btn book-now-btn"
              onClick={() =>
                handleShowAlert(
                  "🎉 Hurrah! Your flight has been booked successfully!"
                )
              }
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Hotels Section */}
        <div className="form-group">
          <label className="bold-label">Hotels</label>
          <div className="input-field display-field flex-between">
            <div>
              <p>
                <strong>Recommended Hotels in {formData.flyingTo}</strong>
              </p>
              <p className="text-muted">5 hotels matching your criteria</p>
            </div>
            <button
              className="submit-btn book-now-btn"
              onClick={() =>
                handleShowAlert(
                  "🎉 Hurrah! Your hotel has been booked successfully!"
                )
              }
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Output;
