import { useEffect, useState } from 'react'
import './App.css'
import MovieCard from './components/MovieCard'
import searchLogo from './search.svg'

const App = () => {
  const API_URl = ' http://www.omdbapi.com/?apikey=b444fca'
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URl}&s=${title}`)
    const data = await response.json()

    setMovies(data.Search)
  }
  useEffect(() => {
    searchMovies('superman')
  }, [])

  return (
    <div className='app'>
      <h1> MovieLand</h1>

      <div className='search'>
        <input
          type='search'
          placeholder='Search'
          value={searchTerm}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchMovies(searchTerm)
            }
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
        />
        <img
          src={searchLogo}
          alt='Search'
          onClick={() => {
            searchMovies(searchTerm)
          }}
        />
      </div>

      {movies != null && movies.length > 0 ? (
        <div className='container'>
          {movies.map((movie, index) => (
            <MovieCard movie={movie} key={index} />
          ))}
        </div>
      ) : (
        <div>
          <h2>No movie found!</h2>
        </div>
      )}
    </div>
  )
}

export default App
