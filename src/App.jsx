import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import Home from './components/Home';
import MovieDetailsPage, {
  loader as MoviesDetails,
} from './pages/Movie-details-page';
import Movies from './components/Movies';
import SeriesDetailsPage, {
  loader as seriesDetails,
} from './pages/TvSeries-details-page';
import TvSeries from './components/Tv-series';
import SaerchResult from './components/search-result';
import ActorDetailsPage, {
  loader as actorsDetails,
} from './pages/Actor-details-page';
import Actors from './components/actors';

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <RootLayout></RootLayout>,
      children: [
        {
          index: true,
          element: <Home></Home>,
        },
        {
          path: '/movies',
          children: [
            {
              index: true,
              element: <Movies></Movies>,
            },
            {
              path: ':movieId',
              element: <MovieDetailsPage></MovieDetailsPage>,
              id: 'moviesDetails',
              loader: MoviesDetails,
            },
          ],
        },
        {
          path: '/series',
          children: [
            {
              index: true,
              element: <TvSeries></TvSeries>,
            },
            {
              path: ':seriesId',
              element: <SeriesDetailsPage></SeriesDetailsPage>,
              id: 'seriesDetails',
              loader: seriesDetails,
            },
          ],
        },
        {
          path: '/actors',
          children: [
            {
              index: true,
              element: <Actors></Actors>,
            },
            {
              path: ':actorId',
              element: <ActorDetailsPage></ActorDetailsPage>,
              id: 'actors-details',
              loader: actorsDetails,
            },
          ],
        },
        {
          path: '/search',
          element: <SaerchResult></SaerchResult>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
