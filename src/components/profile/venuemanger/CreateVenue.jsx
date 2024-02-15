import React, { useState } from 'react';
import { ALLVENUES_URL } from '../../../constant/api';
import { useNavigate } from 'react-router-dom';
import image from '../../../assets/Addvenuesign.png';
import { useUser } from '../../../hooks/type/UserContext';  
import VenueForm from './form/VenueForm';

function AddVenueForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useUser();

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

      console.log(json);
      navigate('/yourvenues');
    } catch (error) {
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex mt-8 m-4 items-center mb-16">
      <div className="hidden md:block">
        <img src={image} alt="Addvenue sign" className="w-70" />
      </div>
      <VenueForm onSubmit={onSubmit} isLoading={isLoading} error={error} />
    </div>
  );
}

export default AddVenueForm;




