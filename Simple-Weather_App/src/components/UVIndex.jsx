import React from 'react';
import '../styles/UVIndex.css';

const UVIndex = ({ city, weatherData }) => {
  const uv = Math.round(weatherData.current.uv);
  const uvPercent = Math.min((uv / 11) * 100, 100);
  
  const getUVDescription = (uvIndex) => {
    if (uvIndex <= 2) return 'Low - Safe to be outside'
    if (uvIndex <= 5) return 'Moderate - Seek shade during midday'
    if (uvIndex <= 7) return 'High - Seek shade, wear sunscreen'
    if (uvIndex <= 10) return 'Very High - Avoid being outside'
    return 'Extreme - Avoid being outside'
  }
  
  const getUVColor = (uvIndex) => {
    if (uvIndex <= 2) return '#4caf50'
    if (uvIndex <= 5) return '#ffeb3b'
    if (uvIndex <= 7) return '#ff9800'
    if (uvIndex <= 10) return '#f44336'
    return '#9c27b0'
  }

  return (
    <div className="uv-container">
      <h3>UV Index</h3>
      <div className="uv-value" style={{ color: getUVColor(uv) }}>
        {uv}
        <span>/11+</span>
      </div>
      <div className="uv-bar">
        <div
          className="uv-progress"
          style={{ 
            width: `${uvPercent}%`,
            backgroundColor: getUVColor(uv)
          }}
        />
      </div>
      <div className="uv-description">
        {getUVDescription(uv)}
      </div>
    </div>
  );
};

export default UVIndex;
