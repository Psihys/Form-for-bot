import React from 'react'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { useMovieContext } from '../context/MovieContext'
import './MovieCard.css'

const MovieCard = ({ movie }) => {
const {isFavorite, addToFavorites, removeFromFavorites, favorites} = useMovieContext()

  const favorite = isFavorite(movie.id)

  const favoriteMovies = (e) => {
    e.preventDefault()
    if (favorite) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites(movie)
    }
  }
  return (
    <div className='movie-card'>
      <div className='movie-poster'>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='movie.title'></img>
        <div className='movie-overlay'>
          <button className={`favorite-btn ${favorite ? 'active' : ''}`} onClick={favoriteMovies}>
            {favorite ? <MdFavorite /> : <MdFavoriteBorder />}
          </button>
        </div>
      </div>
      <div className='movie-info'>
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  )
}

export default MovieCard
