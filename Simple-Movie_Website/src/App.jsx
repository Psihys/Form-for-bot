import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import NavBar from './components/NavBar'
import { useEffect, useState } from 'react'
import { getPopularMovies, searchMovies } from './services/API'
import { MovieProvider } from './context/MovieContext'

function App() {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const movies = await getPopularMovies()
        setMovies(movies)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchPopularMovies()
  }, [])

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <MovieProvider>
      <NavBar />
      {error && <p className='error-message'>{error}</p>}
      {loading ? (
        <p className='loading'>Loading...</p>
      ) : (
        <main className='main-content'>
          <Routes>
            <Route
              path='/'
              element={
                <Home
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  filteredMovies={filteredMovies}
                />
              }
            />
            <Route path='/favorites' element={<Favorites movies={movies} />} />
          </Routes>
        </main>
      )}
    </MovieProvider>
  )
}

export default App
