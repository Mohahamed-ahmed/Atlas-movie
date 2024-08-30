import classes from './cast.module.css';
import { json } from 'react-router-dom';
import { useEffect, useState } from 'react';
function CastSeries({ seriesId }) {
  const [cast, SetCast] = useState([]);

  const apiKey = 'd34cfaf16b011ab67157e66206394524';

  useEffect(() => {
    const fetchCast = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${seriesId}/credits?api_key=${apiKey}`,
      );
      if (!res.ok) {
        throw new json({ message: 'cant fetch data' }, { status: 500 });
      } else {
        const actor = await res.json();
        console.log(actor);
        SetCast(actor.cast);
      }
    };
    fetchCast();
  }, [seriesId]);

  const updatedCast = cast.filter((act) => act.profile_path != null);

  return (
    <div className={classes['cast-section-container']}>
      <h2>Cast</h2>
      <div className={classes['cast-container']}>
        {updatedCast.map((Actor) => (
          <div className={classes.box} key={Actor.id}>
            <div className={classes.image}>
              <img
                src={`https://image.tmdb.org/t/p/original${Actor?.profile_path}`}
              ></img>
            </div>
            <div className={classes.text}>
              <p>{Actor?.original_name}</p>
              <p className={classes.character}>{Actor?.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CastSeries;
