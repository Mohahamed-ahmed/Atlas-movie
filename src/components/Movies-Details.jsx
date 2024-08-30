import classes from './movies-details.module.css';
import SimilarMovies from './similar-movies';
import ReviewsMovies from './reviews-movies';
import CastMovies from './cast-movies';
import { useState, useEffect } from 'react';
import { json } from 'react-router-dom';

function MoviesDetails({ movies }) {
  const [logos, SetLogos] = useState([]);
  const [videos, SetVideos] = useState([]);
  const apiKey = 'd34cfaf16b011ab67157e66206394524';

  console.log(movies);
  console.log(movies.id);

  useEffect(() => {
    const fetchMoviesImages = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movies.id}/images?api_key=${apiKey}`,
      );
      if (!response.ok) {
        throw new json({ message: 'cant get similar movies' }, { status: 500 });
      } else {
        const data = await response.json();
        SetLogos(data.logos);
        console.log(data);
      }
    };
    fetchMoviesImages();
  }, [movies.id]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movies.id}/videos?api_key=${apiKey}`,
      );

      if (!res.ok) {
        throw new json({ message: 'cant get videos' }, { status: 500 });
      } else {
        const videos = await res.json();
        SetVideos(videos.results);
      }
    };
    fetchVideos();
  }, [movies.id]);

  const updatedVideos = videos.filter((vid) => vid.type == 'Trailer');
  console.log(updatedVideos);
  const video_key = updatedVideos[0]?.key;
  console.log(video_key);

  const lo = logos.filter((logo) => logo.iso_639_1 == 'en');
  console.log(lo);

  return (
    <div className={classes.parent}>
      <div className={classes.overlay}></div>
      <div className={classes['moveis-details-container']}>
        <div className={classes.poster}>
          <img
            loading="lazy"
            src={`https://image.tmdb.org/t/p/original${movies.backdrop_path}`}
          ></img>
        </div>
        <div className={classes.details}>
          <div className={classes['logo-container']}>
            {lo[1]?.file_path ? (
              <img
                loading="lazy"
                className={classes.logo}
                src={`https://image.tmdb.org/t/p/original${lo[1]?.file_path}`}
              ></img>
            ) : (
              <h1>{movies.original_title}</h1>
            )}
          </div>
          <p className={classes.tagline}>{movies.tagline}</p>
          <div className={classes.text}>
            <p>{movies.origin_country}</p>
            <p>{movies.original_language}</p>
            <p>{movies.release_date}</p>
            <p>{movies.runtime} min</p>
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
            {movies.genres.map((gen) => (
              <p key={gen.id} className={classes.gen}>
                {gen.name}
              </p>
            ))}
          </p>
          <p className={classes.overview}>{movies.overview}</p>
        </div>
      </div>
      <CastMovies movieId={movies.id}></CastMovies>
      <ReviewsMovies movieId={movies.id}></ReviewsMovies>
      <SimilarMovies movieId={movies.id}></SimilarMovies>
    </div>
  );
}

export default MoviesDetails;
