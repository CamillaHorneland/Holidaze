import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../type/UserContext';
import { useUserActions } from '../type/UserStore';
import { PROFILE_URL } from '../../constant/api';
import { useQuery } from '@tanstack/react-query';

const UpdateProfileForm = () => {
  const { user, setUser } = useUser();
  const { clearUser } = useUserActions(); 
  const [error, setError] = useState(null);

  const { isFetching, isError, data, refetch } = useQuery({
    queryKey: ['profileUpdate'],
    queryFn: () => fetchProfileData(), 
    onSuccess: () => {
      // Optional: Handle success if needed
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

      // Manually update user with the new venueManager status
      setUser((prevUser) => ({ ...prevUser, venueManager: updatedUser.venueManager }));
      setError(null);

      // Trigger a re-fetch to update the UI with the new data
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
          />
        </label>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="mb-4 m-10">
        {isVenueManager && ( // Hvis brukeren allerede er en venue manager
          <Link to="/yourvenues">
            <button className="bg-blue hover:bg-dark-blue text-white font-bold py-2 px-4 rounded-full ml-2">
              Go to Your Venues
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default UpdateProfileForm;







