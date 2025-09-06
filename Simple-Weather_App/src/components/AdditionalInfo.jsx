import React from 'react'
import '../styles/additionalInfo.css'

const AdditionalInfo = ({ weatherData }) => {
  return (
    <div className='additional-info-container'>
      <div>
        <h3>Feels like</h3>
        <p className='value'>{weatherData.current.feelslike_c}</p>
        <p className='description'>
          Humidity is making it feel{' '}
          {weatherData.current.feelslike_c > weatherData.current.temp_c
            ? 'hotter'
            : 'colder'}
        </p>
      </div>
      <div>
        <h3>Precipitation</h3>
        <p className='value'>
          {weatherData.current.precip_mm} <span>in last 24h</span>{' '}
        </p>
        <p className='description'></p>
      </div>
      <div>
        <h3>Visibility</h3>
        <p className='value'>{weatherData.current.vis_km} km</p>
        <p className='description'></p>
      </div>
      <div>
        <h3>Humidity</h3>
        <p className='value'>{weatherData.current.humidity} %</p>
        <p className='description'>
          The dew point is {weatherData.current.dewpoint_c} degrees right now
        </p>
      </div>
    </div>
  )
}

export default AdditionalInfo
