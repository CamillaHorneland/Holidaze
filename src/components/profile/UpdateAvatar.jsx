import React, { useState } from 'react';
import { useUser } from '../type/UserContext';
import { useUserActions } from '../type/UserStore';
import { PROFILE_URL } from '../../constant/api';
import { useQueryClient } from '@tanstack/react-query';  

const UpdateAvatarForm = () => {
  const { user, setUser } = useUser();
  const { clearUser } = useUserActions(); 
  const [avatarUrl, setAvatarUrl] = useState('');
  const [error, setError] = useState('');
  const queryClient = useQueryClient(); 

  const handleAvatarChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({ avatar: avatarUrl }),
      };

      const response = await fetch(`${PROFILE_URL}/${user.name}/media`, options);
      const updatedUser = await response.json();
      console.log('Avatar Update Response:', updatedUser);

      if (!response.ok) {
        throw new Error(updatedUser.message || 'Failed to update avatar');
      }

      setUser((prevUser) => ({ ...prevUser, avatar: updatedUser.avatar }));
      
      setAvatarUrl('');
      setError('');

      queryClient.invalidateQueries(['data', user.name]);
    } catch (error) {
      setError(error.message || 'An error occurred while updating avatar');
      clearUser();
    }
  };

  return (
    <div>
      <h2>Update Avatar</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Avatar URL:
          <input type="text" className="border" value={avatarUrl} onChange={handleAvatarChange} />
        </label>
        <button type="submit" className="bg-blue hover:bg-dark-blue text-white font-bold py-2 px-4 rounded-full ml-2">Update Avatar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UpdateAvatarForm;










