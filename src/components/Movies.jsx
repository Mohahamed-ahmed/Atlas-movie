import classes from './movies-tab.module.css';
import { useEffect, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
function Movies() {
  const [movies, SetMovies] = useState([]);
  const [page, SetPage] = useState(1);

  const apiKey = 'd34cfaf16b011ab67157e66206394524';

  const navigate = useNavigate();

  const movieDetailsHandler = (id) => {
    navigate('/movies/' + id);
  };

  const nextPageHandler = () => {
    SetPage((prev) => {
      const next = prev + 1;
      console.log(next);
      return next;
    });
  };
  const previousPageHandler = () => {
    SetPage((prev) => {
      const previous = prev - 1;
      console.log(previous);
      return previous;
    });
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=${page}`,
      );

      if (!res.ok) {
        throw new json({ message: 'cant get movies' }, { status: 500 });
      } else {
        const moviesarr = await res.json();
        console.log(moviesarr);
        SetMovies(moviesarr.results);
      }
    };
    fetchMovies();
  }, [page]);

  return (
    <div className={classes.father}>
      <h2>Trending</h2>
      <div className={classes.container}>
        {movies.map((movie) => (
          <div
            className={classes.box}
            key={movie.id}
            onClick={() => movieDetailsHandler(movie.id)}
          >
            <img
              loading="lazy"
              src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
            ></img>
            {/* <div className={classes.text}>
                <p>{movie?.title}</p>
                <p>8.5 rate on tomato</p>
              </div> */}
          </div>
        ))}
      </div>
      <div className={classes.buttons}>
        <button className={classes.previous} onClick={previousPageHandler}>
          Previous
        </button>
        <button className={classes.next} onClick={nextPageHandler}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Movies;
