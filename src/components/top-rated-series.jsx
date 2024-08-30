import { json, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import classes from './Tv-section.module.css';

function TopRatedSeries() {
  const [topRatedSeries, SetTopRatedSeries] = useState([]);

  const apiKey = 'd34cfaf16b011ab67157e66206394524';

  const navigate = useNavigate();

  const seriesDetailsHandler = (id) => {
    navigate('/series/' + id);
  };

  useEffect(() => {
    const fetchTvSeries = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`,
      );
      if (!res.ok) {
        throw new json({ message: 'cant fetch data' }, { status: 500 });
      } else {
        const tv = await res.json();
        console.log(tv);
        SetTopRatedSeries(tv.results);
      }
    };
    fetchTvSeries();
  }, []);

  return (
    <div className={classes['section-container']}>
      <h2>Top Rated Series</h2>
      <div className={classes['tv-container']}>
        {topRatedSeries.map((tv) => (
          <div
            className={classes.box}
            key={tv.id}
            onClick={() => seriesDetailsHandler(tv.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${tv?.poster_path}`}
            ></img>
            {/* <div className={classes.text}>
              <p>{tv?.original_name}</p>
              <p>8.5 rate on tomato</p>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopRatedSeries;
