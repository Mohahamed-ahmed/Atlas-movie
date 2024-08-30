// import classes from './tv-details.module.css';
import classes from './tv-details.module.css';
import CastSeries from './cast-series';
import SeasonsSeries from './seasons-series';
import ReviewsSeries from './reviews-series';
import SimilarSeries from './similar-series';
import { useEffect, useState } from 'react';
import { json } from 'react-router-dom';

function TvSeriesDetails({ series }) {
  const [logos, SetLogos] = useState([]);
  const [videos, SetVideos] = useState([]);
  const apiKey = 'd34cfaf16b011ab67157e66206394524';

  useEffect(() => {
    const fetchTvImages = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${series.id}/images?api_key=${apiKey}`,
      );
      if (!response.ok) {
        throw new json({ message: 'cant get similar movies' }, { status: 500 });
      } else {
        const data = await response.json();
        SetLogos(data.logos);
        console.log(data);
      }
    };
    fetchTvImages();
  }, [series.id]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${series.id}/videos?api_key=${apiKey}`,
      );

      if (!res.ok) {
        throw new json({ message: 'cant get videos' }, { status: 500 });
      } else {
        const videos = await res.json();
        SetVideos(videos.results);
      }
    };
    fetchVideos();
  }, [series.id]);

  const updatedVideos = videos.filter((vid) => vid.type == 'Trailer');
  console.log(updatedVideos);
  const video_key = updatedVideos[0]?.key;
  console.log(video_key);

  const lo = logos.filter((logo) => logo.iso_639_1 == 'en');

  return (
    <div className={classes.parent}>
      <div className={classes.overlay}></div>
      <div className={classes['series-details-container']}>
        <div className={classes.poster}>
          <img
            loading="lazy"
            src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`}
          ></img>
        </div>
        <div className={classes.details}>
          <div className={classes['logo-container']}>
            {lo[2]?.file_path ? (
              <img
                loading="lazy"
                className={classes.logo}
                src={`https://image.tmdb.org/t/p/original${lo[2]?.file_path}`}
              ></img>
            ) : (
              <h1>{series.original_title}</h1>
            )}
          </div>
          <p className={classes.tagline}>{series.tagline}</p>
          <div className={classes.text}>
            <p>{series.origin_country}</p>
            <p>{series.original_language}</p>
            <p>{series.first_air_date}</p>
            <p>{series.number_of_episodes} Episods</p>
            <button>
              <a
                href={`https://www.youtube.com/watch?v=${video_key}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Trailer
              </a>
            </button>
            {/* <p className={classes['production-companies']}>
              Production Companies :
              {movies.production_companies.map((prod) => (
                <p key={prod.id} className={classes['company-names']}>
                  {prod.name} ,
                </p>
              ))}
            </p> */}
          </div>
          <p className={classes.genres}>
            {series.genres.map((gen) => (
              <p key={gen.id} className={classes.gen}>
                {gen.name}
              </p>
            ))}
          </p>
          <p className={classes.overview}>{series.overview}</p>
        </div>
      </div>
      <CastSeries seriesId={series.id}></CastSeries>
      <SeasonsSeries seasons={series.seasons}></SeasonsSeries>
      <ReviewsSeries seriesId={series.id}></ReviewsSeries>
      <SimilarSeries seriesId={series.id}></SimilarSeries>
    </div>
  );
}
export default TvSeriesDetails;
