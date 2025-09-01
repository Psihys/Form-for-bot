import MovieCard from '../components/MovieCard'
import './Home.css'

const Home = ({ searchTerm, setSearchTerm, filteredMovies,favoriteMovies }) => {
  

  return (
    <div className='home'>
      <form action='' className='search-form'>
        <input
          type='text'
          placeholder='Search for movies...'
          className='search-input'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
      </form>

      
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            
          />
        ))
      ) : (
        <p className='alert-message'>....Oooops but Nothing found</p>
      )}
    </div>
  )
}

export default Home
