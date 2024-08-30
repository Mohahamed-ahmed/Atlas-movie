import ActorDetails from '../components/Actor-details';
import { json, useRouteLoaderData } from 'react-router-dom';

function ActorDetailsPage() {
  const actors = useRouteLoaderData('actors-details');
  console.log(actors);
  return <ActorDetails Actors={actors}></ActorDetails>;
}

export default ActorDetailsPage;

export async function loader({ params }) {
  const api_key = 'd34cfaf16b011ab67157e66206394524';
  const id_name = params.actorId.split(',');
  const id = id_name[0];
  const name = decodeURIComponent(id_name[1]);
  console.log(id, 'bhgghgjhjh', name);

  // const res = await fetch(
  //   `https://api.themoviedb.org/3/search/multi?query=${name}&include_adult=false&language=en-US&page=1&api_key=${api_key}`,
  // );
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${api_key}`,
  );
  if (!res.ok) {
    throw new json({ message: 'cant get the actors data' }, { status: 500 });
  } else {
    const data = await res.json();
    console.log(data);
    return data;
    // const result = data.results.filter((actor) => actor.id == id);
    // console.log(result);
    // return result[0];
  }
}
