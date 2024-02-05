import { useParams, Link } from 'react-router-dom';
import { PROFILE_URL } from '../../constant/api';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../type/UserContext';
import UpdateAvatarForm from './UpdateAvatar';
import UpdateProfileForm from './BeVenueManager';

async function GetProfile(name, user, includeBookings = false, includeVenues = false) {
  try {
    const bookingsParam = includeBookings ? '_bookings=true' : '';
    const venuesParam = includeVenues ? '_venues=true' : '';

    const queryParams = [bookingsParam, venuesParam].filter(Boolean).join('&');

    const url = `${PROFILE_URL}/${name}${queryParams ? `?${queryParams}` : ''}`;

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
      const json = await response.json();
      const errorMessage = json.errors?.[0]?.message || `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    console.error('Error in GetProfile:', error);
    throw error;
  }
}

function ProfileDetail() {
  const { name: profileName } = useParams();
  const { user, setUser } = useUser();
  const { isFetching, isError, data, refetch } = useQuery({
    queryKey: ['data', profileName],
    queryFn: () => GetProfile(profileName, user, true, true),
    staleTime: 1000 * 60 * 5,
    onSuccess: (newData) => {
      refetch({ force: true });
    },
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <div>An error has occurred: {isError?.message || 'Unknown error'}</div>
      </div>
    );
  }

  if (!data) {
    return <div>No data available for this profile.</div>;
  }

  const { name, email, avatar, venueManager, _count } = data;

   return (
    <div>
      <h1 className="text-3xl font-bold text-dark-blue m-10 mb-10">Your Profile</h1>
      <div className="mx-auto p-4 m-10 mb-16 p-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {/* Avatar Section */}
        <div className="mb-4 m-10">
          {avatar ? (
            <img src={avatar} alt="User Avatar" className="w-40 h-45 border-2" />
          ) : (
            <img src="/src/assets/defaultprofile.png" alt="Default Avatar" className="w-40 h-40 rounded-full" />
          )}
          {setUser && <UpdateAvatarForm />}
        </div>

        {/* Name and Mail Section */}
        <div className="mb-4 m-10">
          <h3 className="text-lg font-bold">Name:</h3> {name}
          <h3 className="text-lg font-bold">Mail:</h3> {email}
        </div>

        {/* UpdateProfileForm Section */}
        <div className="mb-4 m-10">
          <UpdateProfileForm />
        </div>

        {/* Bookings Section */}
        <div className="mb-4 m-10">
          {_count?.bookings === 0 ? (
            <p>You don't have any bookings right now.</p>
          ) : (
            <>
              <p>You have {_count?.bookings} booking{(_count?.bookings !== 1) && 's'}.</p>
              <Link to="/booking">
                <button className="bg-blue hover:bg-dark-blue text-white font-bold py-2 px-4 rounded-full mt-2">
                  Go to Bookings
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileDetail;



 

