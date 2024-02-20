import React, { useState } from 'react';
import { ALLVENUES_URL } from '../../../constant/api';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import image from '../../../assets/Addvenuesign.png';
import { useUser } from '../../../hooks/type/UserContext';  
import VenueForm from './form/VenueForm';

function AddVenueForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useUser();

   const queryClient = useQueryClient();

  async function onSubmit(data) {
    const formattedData = {
      ...data,
      media: typeof data.media === 'string' ? data.media.split(',').map(url => url.trim()) : data.media,
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.accessToken}`,
    };

    const options = {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(formattedData),
    };

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(ALLVENUES_URL, options);
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.errors?.[0]?.message ?? 'There was an error');
      }

      queryClient.invalidateQueries('yourVenues');

      navigate('/yourvenues');
    } catch (error) {
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="m-10">
        <h1 className="font-bold text-3xl mb-16 text-dark-blue">Add Venue:</h1>
        <div className="flex m-10 mb-16">
            <div className="hidden md:block">
                <img src={image} alt="Addvenue sign" className="max:w-56" />
            </div>
            <div className="w-full max-w-md mx-auto">
                <VenueForm onSubmit={onSubmit} isLoading={isLoading} error={error} />
            </div>
        </div>
    </div>
  );
}

export default AddVenueForm;


