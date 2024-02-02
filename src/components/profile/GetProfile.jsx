import { useParams } from 'react-router-dom';
import { PROFILE_URL } from '../../constant/api';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../type/UserContext';

async function GetProfile(name, user, includeBookings = false, includeVenues = false) {
  try {
    const bookingsParam = includeBookings ? '_bookings=true' : '';
    const venuesParam = includeVenues ? '_venues=true' : '';

    const queryParams = [bookingsParam, venuesParam].filter(Boolean).join('&');

    const url = `${PROFILE_URL}/${name}${queryParams ? `?${queryParams}` : ''}`;
    console.log(url);

    if (!user?.accessToken) {
      console.error('Access token is missing or invalid.');
      throw new Error('Access token is missing or invalid.');
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in GetProfile:', error);
    throw error;
  }
}

function ProfileDetail() {
  const { name: profileName } = useParams();
  const { user } = useUser();
  const { isFetching, isError, data } = useQuery({
    queryKey: ['data', profileName],
    queryFn: () => GetProfile(profileName, user, true, true),
    staleTime: 1000 * 60 * 5,
  });

  console.log('ProfileDetail - data:', data);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error has occurred: {isError.message}</div>;
  }

  if (!data) {
    return <div>No data available for this profile.</div>;
  }

  const { name, email, avatar, venueManager, _count } = data;

  return (
    <div className="mx-auto p-4 m-10 mb-16 p-16">
      <h1 className="text-3xl font-bold text-dark-blue m-10 mb-10">Your Profile</h1>
      <div className="mb-4 m-10">
        <h3 className="text-lg font-bold">Name:</h3> {name}
      </div>
      <div className="mb-4 m-10">
        <h3 className="text-lg font-bold">Mail</h3> {email}
      </div>
      <div className="mb-4 m-10">
        <h3 className="text-lg font-bold">Avatar</h3> {avatar}
      </div>
      <div className="mb-4 m-10">
        <h3 className="text-lg font-bold">Venue Manager?</h3> {venueManager ? 'Yes' : 'No'}
      </div>
      <div className="mb-4 m-10">
        <h3 className="text-lg font-bold">Venues</h3> {_count?.venues || 0}
      </div>
      <div className="mb-4 m-10">
        <h3 className="text-lg font-bold">Bookings</h3> {_count?.bookings || 0}
      </div>
    </div>
  );
}

export default ProfileDetail;


 
