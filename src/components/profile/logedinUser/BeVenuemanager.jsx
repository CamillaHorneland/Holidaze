import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../../hooks/type/UserContext';
import { useUserActions } from '../../../hooks/type/UserStore';
import { PROFILE_URL } from '../../../constant/api';
import { useQuery } from '@tanstack/react-query';

const UpdateProfileForm = () => {
  const { user, setUser } = useUser();
  const { clearUser } = useUserActions(); 
  const [error, setError] = useState(null);

  const { isFetching, isError, data, refetch } = useQuery({
    queryKey: ['profileUpdate'],
    queryFn: () => fetchProfileData(), 
    onSuccess: () => {
     
    },
  });

  const isVenueManager = user && user.venueManager;

  const handleVenueManagerChange = async (e) => {
    const updatedVenueManager = e.target.checked;

    try {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({ venueManager: updatedVenueManager }),
      };

      const response = await fetch(`${PROFILE_URL}/${user.name}`, options);
      const updatedUser = await response.json();
      console.log('Profile Update Response:', updatedUser);

      if (!response.ok) {
        throw new Error(updatedUser.message || 'Failed to update profile');
      }

      setUser((prevUser) => ({ ...prevUser, venueManager: updatedUser.venueManager }));
      setError(null);

      refetch();
    } catch (error) {
      setError(error.message || 'An error occurred while updating profile');
      clearUser();
    }
  };

  return (
    <div>
      {user && user.isLoggedIn && !isVenueManager && (
        <label>
          Do you want to become a Venue Manager? 
          <input
            type="checkbox"
            checked={isVenueManager}
            onChange={handleVenueManagerChange}
            className='m-5 w-6'
          />
        </label>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
        {isVenueManager && ( 
          <Link to="/yourvenues">
            <button className="bg-blue hover:bg-dark-blue text-white font-bold py-2 px-4 rounded-full w-52">
              Go to Your Venues
            </button>
          </Link>
        )}
    </div>
  );
};

export default UpdateProfileForm;







