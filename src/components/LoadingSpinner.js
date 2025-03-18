import React from 'react';
import '../styles/components/LoadingSpinner.css';

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Processing...</p>
  </div>
);

export default LoadingSpinner;