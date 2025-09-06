import React, { useEffect, useState } from 'react'
import { getHourlyForecast } from '../api/weatherAPI'
import HourlyTempItem from './HourlyTempItem'
import '../styles/HourlyTempList.css'

const HourlyTempList = ({ city }) => {
  const [hourlyData, setHourlyData] = useState([])
  
  useEffect(() => {
    getHourlyForecast(city)
      .then((data) => setHourlyData(data))
      .catch(console.error)
  }, [city])

  

  return (
    <div className='hourle-temperature-list-container'>
      <h3>Hourly Forecast</h3>
      <div className='hourly-slider'>
        {
          hourlyData?.map((hour,index) =>(
            <HourlyTempItem key={index} hour={hour} />
          ))
        }
      </div>
    </div>
  )
}

export default HourlyTempList
