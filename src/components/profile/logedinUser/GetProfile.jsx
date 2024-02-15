import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROFILE_URL } from '../../../constant/api';
import { useUser } from '../../../hooks/type/UserContext';
import UpdateAvatarForm from './UpdateAvatar';
import UpdateProfileForm from './BeVenuemanager';
import { useFetch } from '../../../hooks/useFetch';

function ProfileDetail() {
  const { name: profileName } = useParams();
  const { user, setUser } = useUser();
  const { data, isLoading, error } = useFetch(
    `${PROFILE_URL}/${profileName}?_bookings=true&_venues=true`, 
    {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    },
    [profileName, user.accessToken]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <div>An error has occurred: {error?.message || 'Unknown error'}</div>
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
               <Link to="/bookings">
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



 

