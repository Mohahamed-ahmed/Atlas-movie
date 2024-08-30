import TvSeriesDetails from '../components/TvSeries-details';
import { json, useRouteLoaderData } from 'react-router-dom';

function SeriesDetailsPage() {
  const data = useRouteLoaderData('seriesDetails');
  return <TvSeriesDetails series={data}></TvSeriesDetails>;
}
export default SeriesDetailsPage;

export async function loader({ params }) {
  const apiKey = 'd34cfaf16b011ab67157e66206394524';
  const id = params.seriesId;

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`,
  );
  if (!res.ok) {
    throw new json({ message: 'cant get the details' }, { status: 500 });
  } else {
    const series = await res.json();
    console.log(series);
    return series;
  }
}
