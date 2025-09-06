import React from 'react'
import '../styles/WindInfo.css'

const WindInfo = ({ city, weatherData }) => {
  const windSpeed = Math.round(weatherData.current.wind_kph)
  const windDir = weatherData.current.wind_dir
  const windDegree = weatherData.current.wind_degree
  const gustSpeed = Math.round(weatherData.current.gust_kph)
  
  const getWindDescription = (speed) => {
    if (speed < 12) return 'Light breeze'
    if (speed < 25) return 'Moderate breeze'
    if (speed < 39) return 'Fresh breeze'
    if (speed < 50) return 'Strong breeze'
    return 'High wind'
  }

  return (
    <div className='wind-info-container'>
      <h3>Wind</h3>
      <div className='wind-speed'>
        {windSpeed}
        <span>km/h</span>
      </div>
      <div className='wind-direction'>
        <div className='wind-compass' style={{ transform: `rotate(${windDegree}deg)` }}>
          ↑
        </div>
        <div className='wind-direction-text'>{windDir}</div>
      </div>
      <div className='wind-description'>
        {getWindDescription(windSpeed)}
      </div>
      {gustSpeed > windSpeed && (
        <div className='wind-gusts'>
          Gusts up to <strong>{gustSpeed} km/h</strong>
        </div>
      )}
    </div>
  )
}

export default WindInfo
