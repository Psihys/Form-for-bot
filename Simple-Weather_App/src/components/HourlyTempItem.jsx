import React from 'react'
import '../styles/HourlyTempItem.css'

const HourlyTempItem = ({ hour }) => {
  return (
    <div className='hourly-item'>
      <p>{hour.time.split(' ')[1]}</p> {/* время, например 14:00 */}
      <img src={hour.condition.icon} alt={hour.condition.text} />
      <p>{Math.round(hour.temp_c)}°C</p>
    </div>
  )
}

export default HourlyTempItem
