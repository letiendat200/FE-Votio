import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () =>{
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <div className="loading-text">Loading...</div>
    </div>
  )
}

export default LoadingScreen;