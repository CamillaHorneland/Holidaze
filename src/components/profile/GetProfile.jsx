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
  const { isFetching, isError, data } = useQuery({
    queryKey: ['data', profileName],
    queryFn: () => GetProfile(profileName, user, true, true),
    staleTime: 1000 * 60 * 5,
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

  const { name, email, avatar, _count } = data;

   return (
    <div>
      <h1 className="text-3xl font-bold text-dark-blue m-10 mb-10">Your Profile</h1>
      <div className="mx-auto my-auto p-4 m-10 mb-16 p-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {/* Avatar Section */}
        <div className="mb-4 m-10">
          {avatar ? (
            <img src={avatar} alt="User Avatar" className="object-scale-down h-60 w-96 border-2 mx-auto my-auto" />
          ) : (
            <img src="/src/assets/defaultprofile.png" alt="Default Avatar" className="object-scale-down h-60 w-96 border-2 mx-auto my-auto" />
          )}
          {setUser && <UpdateAvatarForm />}
        </div>

        {/* Name and Mail Section */}
        <div className="m-10 border-2 bg-light-blue p-3">
          <h3 className="text-lg font-bold mb-5">Name:</h3> {name}
          <h3 className="text-lg font-bold mt-5 mb-5">Mail:</h3> {email}
        </div>

        {/* UpdateProfileForm Section */}
        <div className="mb-4 m-10 mx-auto my-auto">
          <UpdateProfileForm />
        </div>

        {/* Bookings Section */}
        <div className="mb-4 m-10 mx-auto my-auto">
          {_count?.bookings === 0 ? (
            <p className='m-5'>You don't have any bookings right now.</p>
          ) : (
            <>
              <p className='m-4'>You have {_count?.bookings} booking{(_count?.bookings !== 1) && 's'}.</p>
              <Link to="/booking">
                <button className="bg-blue hover:bg-dark-blue text-white font-bold py-2 px-4 rounded-full w-52">
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



 

