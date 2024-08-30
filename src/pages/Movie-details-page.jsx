import { json, useRouteLoaderData } from 'react-router-dom';
import MoviesDetails from '../components/Movies-Details';
function MovieDetailsPage() {
  const data = useRouteLoaderData('moviesDetails');
  console.log(data);

  return <MoviesDetails movies={data}></MoviesDetails>;
}

export default MovieDetailsPage;

export async function loader({ params }) {
  const api_key = 'd34cfaf16b011ab67157e66206394524';

  const id = params.movieId;
  console.log(id);

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`,
  );

  if (!response.ok) {
    throw new json({ message: 'cant get data' }, { status: 500 });
  } else {
    const movies = await response.json();
    console.log(movies);
    return movies;
  }
}
