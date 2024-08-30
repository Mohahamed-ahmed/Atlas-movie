import { useEffect, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import classes from './similar.module.css';
function SimilarMovies({ movieId }) {
  const [similarMovies, SetSimilarMovies] = useState([]);
  const apiKey = 'd34cfaf16b011ab67157e66206394524';

  console.log(movieId);

  const navigate = useNavigate();
  const movieDetailsHandler = (id) => {
    navigate('/movies/' + id);
  };

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`,
      );
      if (!response.ok) {
        throw new json({ message: 'cant get similar movies' }, { status: 500 });
      } else {
        const data = await response.json();
        SetSimilarMovies(data.results);
        console.log(data);
      }
    };
    fetchSimilarMovies();
  }, [movieId]);

  const updatedSimilarMovies = similarMovies.filter(
    (mov) => mov.poster_path != null,
  );

  return (
    <div className={classes['similar-section-container']}>
      <h2>Similar</h2>
      <div className={classes['similar-container']}>
        {updatedSimilarMovies?.map((movie) => (
          <div
            className={classes.box}
            key={movie.id}
            onClick={() => movieDetailsHandler(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
            ></img>
            {/* <div className={classes.text}>
              <p>{movie?.title}</p>
              <p>8.5 rate on tomato</p>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
export default SimilarMovies;
