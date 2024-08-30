import classes from './search.module.css';
import { json, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import av from '../assets/profileImg.png';
import avat from '../assets/profile.jpg';

function SearchBox({ searchVarible }) {
  const [searchResult, SetSearchResult] = useState([]);
  const apiKey = 'd34cfaf16b011ab67157e66206394524';

  const navigate = useNavigate();

  const movieDetailsHandler = (id, media_type) => {
    console.log(media_type);
    if (media_type === 'movie') {
      console.log('mosjhjsjhjdh');
      navigate('/movies/' + id);
    } else if (media_type === 'tv') {
      navigate('/series/' + id);
    } else {
      navigate('/actors/' + id);
    }
  };

  useEffect(() => {
    const fetchSearch = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${searchVarible}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`,
      );

      if (!res.ok) {
        throw new json({ message: 'cant get movies' }, { status: 500 });
      } else {
        const moviesarr = await res.json();
        console.log(moviesarr);
        SetSearchResult(moviesarr.results);
      }
    };
    fetchSearch();
  }, [searchVarible]);

  const updatedSearchResult = searchResult.filter((mov) =>
    mov.poster_path ? mov.poster_path != null : mov.profile_path != null,
  );

  console.log(updatedSearchResult);

  return (
    <div className={classes.container}>
      {updatedSearchResult.map((movie) => (
        <div
          className={classes.box}
          key={movie.id}
          onClick={() => movieDetailsHandler(movie.id, movie.media_type)}
        >
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${
                movie.poster_path || movie.backdrop_path || movie.profile_path
              }`}
            ></img>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchBox;
