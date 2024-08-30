import classes from './seasons-series.module.css';
function SeasonsSeries({ seasons }) {
  const updatedSeasons = seasons.filter((season) => season.name != 'Specials');
  return (
    <div className={classes['seasons-section-container']}>
      <h2>Seasons</h2>
      <div className={classes['seasons-container']}>
        {updatedSeasons.map((season) => (
          <div className={classes.box} key={season.id}>
            <div className={classes.image}>
              <img
                src={`https://image.tmdb.org/t/p/original${season?.poster_path}`}
              ></img>
            </div>
            <div className={classes.text}>
              <p>{season.name}</p>
              <p className={classes.overview}>{season.overview}</p>
              <p>{season.vote_average}/10</p>
              {/* <p>{season.episode_count}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeasonsSeries;
