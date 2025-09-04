import { useMemo, useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'

function App() {
  const [movies,setMovie] = useState([
    {
      id: 1,
      title: "The Shawshank Redemption",
      image: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      rating: 9.2
    },
    {
      id: 2,
      title: "The Godfather",
      image: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      rating: 9.1
    },
    {
      id: 3,
      title: "The Dark Knight",
      image: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      rating: 9.0
    },
    {
      id: 4,
      title: "Pulp Fiction",
      image: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      rating: 8.9
    },
    {
      id: 5,
      title: "Schindler's List",
      image: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      rating: 8.8
    },
    {
      id: 6,
      title: "The Lord of the Rings: The Return of the King",
      image: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      rating: 8.7
    },
    {
      id: 7,
      title: "The Good, the Bad and the Ugly",
      image: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      rating: 8.6
    },
    {
      id: 8,
      title: "Fight Club",
      image: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      rating: 8.5
    },
    {
      id: 9,
      title: "Forrest Gump",
      image: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      rating: 8.4
    },
    {
      id: 10,
      title: "Inception",
      image: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      rating: 8.3
    }
  ])

  const [search,setSearch] = useState("")
  
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }



  const filteredMovies = useMemo(() =>{
    return movies.filter((movie) => {
    return movie.title.toLowerCase().includes(search.toLowerCase())
    })
  }, [search]) 
  
  

  return (
    <>
      <HomePage  search={search} handleSearch={handleSearch} filteredMovies={filteredMovies} />
    </>
  )
}

export default App
