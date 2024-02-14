import { useParams } from 'react-router-dom';
import DefaultImage from '../../../assets/defaultprofile.png';
import { useFetch } from '../../../hooks/useFetch';
import { ALLVENUES_URL } from '../../../constant/api';

function HostDetail() {
  const { id } = useParams();

  const { data: venueData, isPending: isVenuePending, error: venueError } = useFetch(
    `${ALLVENUES_URL}/${id}`,
    {},
    [],
  );

  const { data: hostData, isLoading: isHostLoading, isError: isHostError } = useFetch(
    `${ALLVENUES_URL}/${id}?_owner=true`,
    {},
    [],
  );

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








