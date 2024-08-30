import { useEffect, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import classes from './similar.module.css';
function SimilarSeries({ seriesId }) {
  const [similarSeries, SetSimilarSeries] = useState([]);
  const apiKey = 'd34cfaf16b011ab67157e66206394524';

  const navigate = useNavigate();
  const movieDetailsHandler = (id) => {
    navigate('/series/' + id);
  };

  useEffect(() => {
    const fetchSimilarSeries = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${seriesId}/similar?api_key=${apiKey}`,
      );
      if (!response.ok) {
        throw new json({ message: 'cant get similar movies' }, { status: 500 });
      } else {
        const data = await response.json();
        SetSimilarSeries(data.results);
        console.log(data);
      }
    };
    fetchSimilarSeries();
  }, [seriesId]);
  const updatedSimilarSeries = similarSeries.filter(
    (mov) => mov.poster_path != null,
  );
  console.log(updatedSimilarSeries);

  return (
    <div className={classes['similar-section-container']}>
      <h2>Similar</h2>
      <div className={classes['similar-container']}>
        {updatedSimilarSeries?.map((tv) => (
          <div
            className={classes.box}
            key={tv.id}
            onClick={() => movieDetailsHandler(tv.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${tv?.poster_path}`}
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
export default SimilarSeries;
