import React from 'react'
import { useMovieContext } from '../context/MovieContext'
import MovieCard from '../components/MovieCard'
import './Favorite.css'

const Favorites = () => {
  const { favorites } = useMovieContext()
  return (
    <>
      {favorites.length > 0 ? (
        <div className='favorites'>
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className='favourite-empty'>
          <h2>No Favorite Movies yet</h2>
          <p>Add movies to your favorites to see them here.</p>
        </div>
      )}
    </>
  )
}

export default Favorites
