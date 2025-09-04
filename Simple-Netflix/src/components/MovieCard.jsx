import React from 'react'

const MovieCard = ({movie}) => {
  return (
    <div>
        <image src={movie.image} alt = {movie.title}/>

        
        <div>
            <h2>{movie.title}</h2>
            {movie.rating}
        </div>
    </div>
  )
}

export default MovieCard