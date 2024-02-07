import { useParams } from 'react-router-dom';
import { ALLVENUES_URL } from '../../../constant/api';
import { useQuery } from '@tanstack/react-query';
import DefaultImage from '../../../assets/defaultprofile.png';

async function getVenue(id) {
  const response = await fetch(`${ALLVENUES_URL}/${id}`);

  if (!response.ok) {
    throw new Error('There was an error fetching the venue');
  }

  return response.json();
}

async function getHostWithOwner(id) {
  const response = await fetch(`${ALLVENUES_URL}/${id}?_owner=true`);

  if (!response.ok) {
    throw new Error('There was an error fetching the host');
  }

  return response.json();
}

function HostDetail() {
  const { id } = useParams();

  const { isPending: isVenuePending, error: venueError, data: venueData } = useQuery({
    queryKey: ['venue', id],
    queryFn: () => getVenue(id),
    staleTime: 1000 * 60 * 5,
  });

  const { data: hostData, isLoading: isHostLoading, isError: isHostError } = useQuery({
    queryKey: ['host', id],
    queryFn: () => getHostWithOwner(id),
    staleTime: 1000 * 60 * 5,
  });

  if (isVenuePending) {
    return <div>Loading...</div>;
  }

  if (venueError) {
    return <div>An error has occurred: {venueError.message || "Unknown error"}</div>;
  }

  return (
  <>
    {hostData && (
    <div className="bg-blue flex flex-wrap p-4 rounded-md shadow-md m-10">
        <h3 className="text-lg font-bold m-4">Host:</h3>
        <div className="w-12 h-12 overflow-hidden rounded-ful">
            <img
              src={hostData.owner?.avatar || DefaultImage}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full"
            />
        </div>
        <p className="text-sm m-6">{hostData.owner?.name}</p>
        <p className="text-sm m-6">{hostData.owner?.email}</p>
  </div>
    )}
  </>
);
}

export default HostDetail;







