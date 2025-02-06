import React from 'react';
import { FaPlane, FaPassport, FaSuitcase, FaGlobeAmericas, FaMapMarkedAlt, FaUmbrellaBeach } from 'react-icons/fa';

const Layout = ({ children }) => {
  return (
    <>
      <div className="animated-background">
        <div className="floating-icons">
          <div className="travel-icon"><FaPlane /></div>
          <div className="travel-icon"><FaPassport /></div>
          <div className="travel-icon"><FaSuitcase /></div>
          <div className="travel-icon"><FaGlobeAmericas /></div>
          <div className="travel-icon"><FaMapMarkedAlt /></div>
          <div className="travel-icon"><FaUmbrellaBeach /></div>
        </div>
      </div>
      {children}
    </>
  );
};

export default Layout; 