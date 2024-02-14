import React, { useState } from 'react';
import { useUser } from '../../hooks/type/UserContext';
import { PROFILE_URL } from '../../constant/api';
import { useQueryClient } from '@tanstack/react-query';  

const UpdateAvatarForm = () => {
  const { user, setUser } = useUser();
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
     
      if (!response.ok) {
        throw new Error(updatedUser.message || 'Failed to update avatar');
      }

      setUser((prevUser) => ({ ...prevUser, avatar: updatedUser.avatar }));
      
      setAvatarUrl('');
      setError('');

      queryClient.invalidateQueries(['data', user.name]);
    } catch (error) {
      setError(error.message || 'An error occurred while updating avatar');
    }
  };

  return (
      <div className='text-center'>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <label>
                <input 
                  type="text" 
                  className="mt-5 m-b-5 bg-light-blue p-2 h-10 border border-blue rounded-md" 
                  value={avatarUrl} 
                  onChange={handleAvatarChange} 
                  placeholder="Avatar URL here" 
                />
            </label>
            <button type="submit" className="bg-blue hover:bg-dark-blue text-white font-bold py-2 px-4 rounded-full mt-5 w-full max-w-52">Update Avatar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
       </div>
    );
};

export default UpdateAvatarForm;










