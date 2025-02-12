import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { FaShare, FaWhatsapp, FaTwitter, FaFacebook, FaCopy } from 'react-icons/fa';

const Output = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, finalContent } = location.state || {};

  // Redirect to home if no data
  React.useEffect(() => {
    if (!formData || !finalContent) {
      navigate("/");
    }
  }, [formData, finalContent, navigate]);

  const shareData = {
    title: "My Travel Itinerary",
    text: `Check out my travel plan from ${formData?.flyingFrom} to ${formData?.flyingTo}!`,
    url: window.location.href,
  };

  const handleShare = async (platform) => {
    try {
      switch (platform) {
        case "native":
          if (navigator.share) {
            await navigator.share(shareData);
          }
          break;
        case "whatsapp":
          window.open(
            `https://wa.me/?text=${encodeURIComponent(
              `${shareData.text} ${shareData.url}`
            )}`
          );
          break;
        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `${shareData.text} ${shareData.url}`
            )}`
          );
          break;
        case "facebook":
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              shareData.url
            )}`
          );
          break;
        case "copy":
          await navigator.clipboard.writeText(
            `${shareData.text} ${shareData.url}`
          );
          alert("Link copied to clipboard!");
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  // Function to handle showing alert
  const handleShowAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  // In a real application, you would pass the form data through state or context
  // For now, we'll use placeholder data similar to the input structure
  const formData = {
    fromDate: "2024-03-20",
    toDate: "2024-03-27",
    flyingFrom: "New York",
    flyingTo: "Paris",
    travelers: 2,
    budget: 5000,
    currency: "USD",
  };

  return (
    <div className="input-container">
      {showAlert && (
        <Alert
        <Alert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
          isSuccess={true}
        />
      )}
      <div className="centered-form">
        {/* Main Title */}
        <h1 className="trip-title">Your Trip</h1>
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
            <p>{finalContent.weather}</p>
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
          <div className="input-field display-field">
            {finalContent.flights.map((flight, index) => (
              <div key={index} className="flight-card">
                <div className="flight-header">
                  <div className="airline-info">
                    <i className="fas fa-plane"></i>
                    <span className="airline-name">{flight.airline}</span>
                    <span className="flight-number">#{flight.flightNumber}</span>
                  </div>
                  <div className="flight-price">${flight.price}</div>
                </div>
                <div className="flight-details">
                  <div className="time-container">
                    <div className="departure">
                      <div className="time">{flight.departure}</div>
                      <div className="city">{formData.flyingFrom}</div>
                    </div>
                    <div className="flight-duration">
                      <div className="duration-line">
                        <i className="fas fa-plane flight-icon"></i>
                      </div>
                      <div className="duration-text">Direct Flight</div>
                    </div>
                    <div className="arrival">
                      <div className="time">{flight.arrival}</div>
                      <div className="city">{formData.flyingTo}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="booking-button">
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
          <div className="input-field display-field">
            {finalContent.hotels.map((hotel, index) => (
              <div key={index} className="hotel-card">
                <div className="hotel-header">
                  <div className="hotel-info">
                    <i className="fas fa-hotel"></i>
                    <span className="hotel-name">{hotel.name}</span>
                  </div>
                  <div className="hotel-price">${hotel.price}<span>/night</span></div>
                </div>
                <div className="hotel-details">
                  <div className="location">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{hotel.location}</span>
                  </div>
                  <div className="rating">
                    <i className="fas fa-star"></i>
                    <span>{hotel.rating} / 5</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="booking-button">
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

        {/* Recommended Plan Section */}
        <div className="form-group">
          <label className="bold-label">Recommended Itinerary</label>
          <div className="input-field display-field">
            <div className="itinerary-timeline">
              {finalContent.itinerary.map((day, index) => (
                <div key={index} className="day-card">
                  <div className="day-marker">
                    <div className="day-circle">
                      <i className="fas fa-calendar-day"></i>
                    </div>
                    <div className="day-number">Day {index + 1}</div>
                  </div>
                  <div className="day-content">
                    <p>{Object.values(day)[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Share buttons */}
        <div className="share-container">
          <h3>Share Your Itinerary</h3>
          <div className="share-buttons">
            {navigator.share && (
              <button onClick={() => handleShare('native')} className="share-btn">
                <FaShare /> Share
              </button>
            )}
            <button onClick={() => handleShare('whatsapp')} className="share-btn whatsapp">
              <FaWhatsapp /> WhatsApp
            </button>
            <button onClick={() => handleShare('twitter')} className="share-btn twitter">
              <FaTwitter /> Twitter
            </button>
            <button onClick={() => handleShare('facebook')} className="share-btn facebook">
              <FaFacebook /> Facebook
            </button>
            <button onClick={() => handleShare('copy')} className="share-btn copy">
              <FaCopy /> Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Output;
