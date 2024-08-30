import classes from './actor-details.module.css';
import ActorWorks from './Actor-works';

function ActorDetails({ Actors }) {
  console.log(Actors);

  return (
    <div className={classes.parent}>
      <div className={classes.overlay}></div>
      <div className={classes['actor-details-container']}>
        <div className={classes.profile}>
          <img
            src={`https://image.tmdb.org/t/p/original${Actors.profile_path}`}
          ></img>
        </div>
        <div className={classes['actor-container']}>
          <div className={classes.poster}>
            <img
              src={`https://image.tmdb.org/t/p/original${Actors.profile_path}`}
            ></img>
          </div>
          <div className={classes.details}>
            <p>{Actors.name}</p>
            <p>{Actors.biography}</p>
            <p>{Actors.birthday}</p>
            <p>{Actors.place_of_birth}</p>
          </div>
        </div>
      </div>
      <ActorWorks actorId={Actors.id}></ActorWorks>
    </div>
  );
}

export default ActorDetails;
