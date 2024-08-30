import { useEffect, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import classes from './similar.module.css';

function ActorWorks({ actorId }) {
  const [actorWorks, SetActorWorks] = useState([]);
  const apiKey = 'd34cfaf16b011ab67157e66206394524';

  const navigate = useNavigate();

  const movieDetailsHandler = (id, media_type) => {
    if (media_type === 'movie') {
      navigate('/movies/' + id);
    } else if (media_type === 'tv') {
      navigate('/series/' + id);
    }
  };
  useEffect(() => {
    const fetchActorWorks = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=${apiKey}`,
      );
      if (!response.ok) {
        throw new json({ message: 'cant get similar movies' }, { status: 500 });
      } else {
        const data = await response.json();
        SetActorWorks(data.cast);
        console.log(data);
      }
    };
    fetchActorWorks();
  }, [actorId]);

  const updatedActorWorks = actorWorks.filter((mov) => mov.poster_path != null);

  return (
    <div className={classes['similar-section-container']}>
      <h2>Most Popular Works</h2>
      <div className={classes['similar-container']}>
        {updatedActorWorks?.map((movie) => (
          <div
            className={classes.box}
            key={movie.id}
            onClick={() => movieDetailsHandler(movie.id, movie.media_type)}
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
export default ActorWorks;
