import classes from './home.module.css';
import image from '../assets/wallpaperflare.com_wallpaper (1).jpg';
import MoviesSection from './movies-section';
import Tv from './Tv-section';
import Actors from './Actors-section';
import TopRatedSeries from './top-rated-series';
import TopRatedMoviesSection from './top-rated-movies';

function Home() {
  return (
    <div>
      <div className={classes.container}>
        <img src={image} className={classes.image}></img>
      </div>
      <MoviesSection></MoviesSection>
      <TopRatedMoviesSection></TopRatedMoviesSection>
      <Tv></Tv>
      <TopRatedSeries></TopRatedSeries>
      <Actors></Actors>
    </div>
  );
}
export default Home;
