import {useEffect, useState} from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import MainInfo from './components/MainInfo'
import {  getFullInfo } from './api/weatherAPI'
import DetailedInfo from './components/DetailedInfo'

function App() {

  const [city, setCity] = useState('London')
  const [searchQuery, setSearchQuery] = useState('')
  const [weatherData, setWeatherData] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    setCity(searchQuery)
    setSearchQuery('')
  }

  useEffect(() => {
    getFullInfo('London')
    .then(
      (data) => console.log(data)
    )
    .catch(
      (error) => console.error(error)
    )
  }, [])
  
  return (
    <div className='container'>
      <div className='weather-container'>
        <div className='search-info'>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
          />

          <MainInfo city={city} weatherData = {weatherData} setWeatherData = {setWeatherData}/>
        </div>
        <div>
          <DetailedInfo city={city} weatherData = {weatherData} setWeatherData = {setWeatherData}/>
        </div>
      </div>
    </div>
  )
}

export default App
