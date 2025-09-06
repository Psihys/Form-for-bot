import { useEffect } from 'react'
import { getCurrentWeather } from '../api/weatherAPI'
import HourlyTempList from './HourlyTempList'
import DaysForecast from './DaysForecast'
import UVIndex from './UVIndex'
import WindInfo from './WindInfo'
import '../styles/detailedInfo.css'

const DetailedInfo = ({ city, weatherData, setWeatherData }) => {

  useEffect(() => {
    getCurrentWeather(city)
      .then((data) => setWeatherData(data))
      .catch(console.error)
  }, [city])

  if (!weatherData) return <p>Loading...</p>
  if (weatherData.error) return <p>Error: {weatherData.error.message}</p>

  return (
    <div className='detailed-info-wrapper'>
      <div className='detailed-info-container'>
        <HourlyTempList
          city={city}
        />
        <DaysForecast
          city={city}
        />
        <div className='vui_wind-container'>
          <UVIndex
            city={city}
            weatherData={weatherData}
            setWeatherData={setWeatherData}
          />
          <WindInfo
            city={city}
            weatherData={weatherData}
            setWeatherData={setWeatherData}
          />
        </div>
      </div>
    </div>
  )
}

export default DetailedInfo
