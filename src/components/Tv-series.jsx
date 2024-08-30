import classes from './tv-series-tab.module.css';
import { json, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function TvSeries() {
  const [series, SetMovies] = useState([]);
  const [page, SetPage] = useState(1);

  const apiKey = 'd34cfaf16b011ab67157e66206394524';

  const navigate = useNavigate();

  const seriesDetailsHandler = (id) => {
    navigate('/series/' + id);
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
        `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}&page=${page}`,
      );

      if (!res.ok) {
        throw new json({ message: 'cant get movies' }, { status: 500 });
      } else {
        const seriesarr = await res.json();
        console.log(seriesarr);
        SetMovies(seriesarr.results);
      }
    };
    fetchMovies();
  }, [page]);

  return (
    <div className={classes.father}>
      <h2>Trending</h2>
      <div className={classes.container}>
        {series.map((ser) => (
          <div
            className={classes.box}
            key={ser.id}
            onClick={() => seriesDetailsHandler(ser.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${ser?.poster_path}`}
            ></img>
            {/* <div className={classes.text}>
                <p>{ser?.original_name}</p>
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

export default TvSeries;
