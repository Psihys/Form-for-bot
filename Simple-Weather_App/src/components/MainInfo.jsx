import React, { useEffect } from 'react'
import { getCurrentWeather } from '../api/weatherAPI'
import '../styles/mainInfo.css'
import AdditionalInfo from './AdditionalInfo'

const MainInfo = ({ city, weatherData, setWeatherData }) => {
  useEffect(() => {
    getCurrentWeather(city)
      .then((data) => setWeatherData(data))
      .catch(console.error)
  }, [city])

  if (!weatherData) return <p>Loading...</p>
  if (weatherData.error) return <p>Error: {weatherData.error.message}</p>

  return (
    <div className='main-info-container'>
      <div className='main-info'>
        <h2>
          <span>{weatherData.location.name}</span>{' '}
          {Math.round(weatherData.current.temp_c)}
        </h2>

        <p>{weatherData.current.condition.text}</p>
      </div>

      <AdditionalInfo weatherData={weatherData} />
    </div>
  )
}

export default MainInfo
