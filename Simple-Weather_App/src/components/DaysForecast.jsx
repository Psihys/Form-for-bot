import { useEffect, useState } from 'react'
import React from 'react'
import { getForecastWeather } from '../api/weatherAPI'
import '../styles/daysForecast.css'

const DaysForecast = ({ city }) => {
  const [days, setDays] = useState([])

  useEffect(() => {
    getForecastWeather(city)
      .then((data) => setDays(data.forecast.forecastday))
      .catch(console.error)
  }, [city])

  return (
    <div className='days-forecast-container'>
      <h3>3-DAYS FORECAST</h3>
      <div className='forecast-slider'>
        {days.map((day, index) => (
          <div key={index} className='forecast-card'>
            <p className='forecast-date'>
              {new Date(day.date).toLocaleDateString('en-GB', {
                weekday: 'short',
                day: '2-digit',
                month: '2-digit',
              })}
            </p>
            <p className='forecast-temp'>{Math.round(day.day.avgtemp_c)}°</p>
            <p className='forecast-condition'>{day.day.condition.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DaysForecast
