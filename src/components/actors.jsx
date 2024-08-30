import classes from './actors-tab.module.css';
import { useEffect, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
function Actors() {
  const [actors, SetActors] = useState([]);
  const [page, SetPage] = useState(1);

  const apiKey = 'd34cfaf16b011ab67157e66206394524';

  const navigate = useNavigate();

  const movieDetailsHandler = (id, name) => {
    navigate(`/actors/${id},${name}`);
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
    const fetchActors = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/person/day?api_key=${apiKey}&page=${page}`,
      );

      if (!res.ok) {
        throw new json({ message: 'cant get movies' }, { status: 500 });
      } else {
        const moviesarr = await res.json();
        console.log(moviesarr);
        SetActors(moviesarr.results);
      }
    };
    fetchActors();
  }, [page]);

  const updatedActors = actors.filter((act) => act.profile_path != null);

  return (
    <div className={classes.father}>
      <h2>Most Popular</h2>
      <div className={classes.container}>
        {updatedActors.map((actor) => (
          <div
            className={classes.box}
            key={actor.id}
            onClick={() => movieDetailsHandler(actor.id, actor.name)}
          >
            <div className={classes.image}>
              <img
                src={`https://image.tmdb.org/t/p/original${actor?.profile_path}`}
              ></img>
            </div>
            <div className={classes.text}>
              <p>{actor?.name}</p>
            </div>
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

export default Actors;
