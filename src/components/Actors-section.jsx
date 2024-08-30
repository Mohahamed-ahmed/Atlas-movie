import classes from './actors-section.module.css';
import { json, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
function Actors() {
  const [Actors, SetActors] = useState([]);

  const apiKey = 'd34cfaf16b011ab67157e66206394524';

  const navigate = useNavigate();

  const seriesDetailsHandler = (id, name) => {
    navigate(`/actors/${id},${name}`);
  };

  useEffect(() => {
    const fetchActors = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/person/day?api_key=${apiKey}`,
      );
      if (!res.ok) {
        throw new json({ message: 'cant fetch data' }, { status: 500 });
      } else {
        const actor = await res.json();
        console.log(actor);
        SetActors(actor.results);
      }
    };
    fetchActors();
  }, []);

  return (
    <div className={classes['section-container']}>
      <h2>Actors</h2>
      <div className={classes['actor-container']}>
        {Actors.map((Actor) => (
          <div
            className={classes.box}
            key={Actor.id}
            onClick={() => seriesDetailsHandler(Actor.id, Actor.name)}
          >
            <div className={classes.image}>
              <img
                src={`https://image.tmdb.org/t/p/original${Actor?.profile_path}`}
              ></img>
            </div>
            <div className={classes.text}>
              <p>{Actor?.original_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Actors;
