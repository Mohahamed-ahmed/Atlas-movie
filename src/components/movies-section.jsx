import classes from './movies-section.module.css';
import { json, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css'; // Basic Swiper styles
// import 'swiper/css/navigation'; // For navigation module styles
// import 'swiper/css/pagination'; // For pagination module styles

// SwiperCore.use([Navigation, Pagination]);

function MoviesSection() {
  const [movies, SetAllMovies] = useState([]);
  const navigate = useNavigate();

  const movieDetailsHandler = (id) => {
    navigate('/movies/' + id);
  };

  const apiKey = 'd34cfaf16b011ab67157e66206394524';

  // const fetchMovies = useCallback(async () => {
  //   const res = await fetch(
  //     `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`,
  //   );

  //   if (!res.ok) {
  //     throw new json({ message: 'cant get the movies' }, { status: 500 });
  //   } else {
  //     const data = await res.json();
  //     console.log(data);

  //     return data.results;
  //   }
  // }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`,
      );

      if (!res.ok) {
        throw new json({ message: 'cant get the movies' }, { status: 500 });
      } else {
        const data = await res.json();
        console.log(data);
        SetAllMovies(data.results);
      }
    };
    fetchMovies();
  }, []);
  console.log(movies[4]?.title);

  return (
    <div className={classes['section-container']}>
      <h2>Trending Movies</h2>
      <div className={classes['movies-container']}>
        {movies.map((movie) => (
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

export default MoviesSection;
