import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import Loading from './components/Loading';

function App() {

  const [movies, setMovies] = useState([])
  const [isLoading, setIsloading] = useState(false)
  const [error, setError] = useState(null)


  const fetchMoviesHandler = async () => {
    setIsloading(true)
    setError(null)
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wronggg")
      }
      const data = await response.json();



      const transformedData = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date

        }
      })
      setMovies(transformedData)

    } catch (error) {
      setError(error.message);
    }
    setIsloading(false)
  }


  let contnet = <p>Found no movies</p>


  if (movies.length > 0) {
    contnet = <MoviesList movies={movies} />
  }
  if (error) {
    contnet = <p>{error}</p>
  }
  if (isLoading) {
    contnet = <Loading />
  }


  return (
    <React.Fragment>

      <section>
        <button onClick={fetchMoviesHandler} >Fetch Movies</button>
      </section>
      <section>
        {contnet}
      </section>
    </React.Fragment>
  );
}

export default App;
