import { useEffect, useState } from 'react';
import { json } from 'react-router-dom';
import classes from './reviews.module.css';
function ReviewsSeries({ seriesId }) {
  const [reviews, SetReviews] = useState([]);
  const apiKey = 'd34cfaf16b011ab67157e66206394524';

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${seriesId}/reviews?api_key=${apiKey}`,
      );
      if (!response.ok) {
        throw new json({ message: 'cant get similar movies' }, { status: 500 });
      } else {
        const data = await response.json();
        SetReviews(data.results);
        console.log(data);
      }
    };
    fetchSimilarMovies();
  }, [seriesId]);

  return (
    <div className={classes['reviews-section-container']}>
      <h2>Reviews</h2>
      <div className={classes['reviews-container']}>
        {reviews?.map((review) => {
          const { name, username, avatar, rating } =
            review?.author_details || {};
          return (
            <div className={classes.box} key={review?.id}>
              <div className={classes.text}>
                <p className={classes.username}>{username}</p>
                <p className={classes.content}>{review?.content}</p>
                <p className={classes.rate}>
                  {rating ? rating : rating === null && 0}/10
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default ReviewsSeries;
