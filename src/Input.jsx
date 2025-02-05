import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Input = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    travelers: 1,
    flyingFrom: "",
    flyingTo: "",
    fromDate: "",
    toDate: "",
    budget: "",
    currency: "USD"
  });
  const [showAlert, setShowAlert] = useState(false);
  const [errorFields, setErrorFields] = useState([]);

  const handleTravelersChange = (action) => {
    setFormData((prev) => ({
      ...prev,
      travelers: action === "increment" ? prev.travelers + 1 : Math.max(1, prev.travelers - 1),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check which fields are empty
    const emptyFields = Object.entries(formData)
      .filter(([key, value]) => value === "")
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      setErrorFields(emptyFields);
      setShowAlert(true);
      // Auto-hide alert after 5 seconds
      setTimeout(() => setShowAlert(false), 5000);
    } else {
      navigate("/output");
    }
  };

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "NOK", symbol: "Nok", name: "Nok" }
  ];

  return (
    <div className="input-container">
      {showAlert && (
        <div className="alert-container">
          <div className="alert-content">
            <p className="alert-title">Please fill in the following fields:</p>
            <ul className="alert-list">
              {errorFields.map((field) => (
                <li key={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </li>
              ))}
            </ul>
            <button 
              className="alert-close-btn"
              onClick={() => setShowAlert(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="centered-form">
        <div className="form-group">
          <label className="bold-label">Number of Travelers</label>
          <div className="travelers-input">
            <button 
              type="button" 
              onClick={() => handleTravelersChange("decrement")}
              className="traveler-btn"
            >-</button>
            <span>{formData.travelers}</span>
            <button 
              type="button" 
              onClick={() => handleTravelersChange("increment")}
              className="traveler-btn"
            >+</button>
          </div>
        </div>

        <div className="form-group-row">
          <div className="form-group">
            <label className="bold-label">Flying From</label>
            <input
              type="text"
              value={formData.flyingFrom}
              onChange={(e) => setFormData({ ...formData, flyingFrom: e.target.value })}
              placeholder="Enter departure city"
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label className="bold-label">Flying To</label>
            <input
              type="text"
              value={formData.flyingTo}
              onChange={(e) => setFormData({ ...formData, flyingTo: e.target.value })}
              placeholder="Enter destination city"
              className="input-field"
            />
          </div>
        </div>

        <div className="form-group-row">
          <div className="form-group">
            <label className="bold-label">From Date</label>
            <input
              type="date"
              value={formData.fromDate}
              onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label className="bold-label">To Date</label>
            <input
              type="date"
              value={formData.toDate}
              onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
              className="input-field"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="bold-label">Budget</label>
          <div className="budget-container">
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              placeholder="Enter your budget"
              className="input-field budget-input"
            />
            <select
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="currency-select"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} ({currency.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Plan My Trip !
        </button>
      </form>
    </div>
  );
};

export default Input;
