import { useState, useEffect } from 'react'
import React from 'react'
import MovieCard from '../components/MovieCard'

const HomePage = ({ search, handleSearch, filteredMovies }) => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div>
      {time.toLocaleTimeString()}
      <input type='text' value={search} onChange={handleSearch} />
      {filteredMovies.map((movie) => {
        return <MovieCard key={movie.id} movie={movie} />
      })}
    </div>
  )
}

export default HomePage
