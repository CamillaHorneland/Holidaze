import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { ALLVENUES_URL } from '../../../constant/api';
import { useUser } from '../../../hooks/type/UserContext';
import { useFetch } from '../../../hooks/useFetch';
import EditForm from './form/EditForm';

function EditVenueForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useUser();
  const { id: venueId } = useParams();

  const { data: venueData, isLoading: venueIsLoading, error: venueError } = useFetch(
    `${ALLVENUES_URL}/${venueId}`,
    {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    },
    [user.accessToken, venueId]
  );

   const queryClient = useQueryClient();

   async function onSubmit(data) {
    const formattedData = {
        ...data,
        media: Array.isArray(data.media) ? data.media : (typeof data.media === 'string' ? data.media.split(',').map(url => url.trim()) : []),
    };
   
    try {
        setIsLoading(true);
        setError(null);
        
        const putOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`,
            },
            method: 'PUT',
            body: JSON.stringify(formattedData),
        };
        
        const response = await fetch(`${ALLVENUES_URL}/${venueId}`, putOptions);
        const updatedVenueData = await response.json();
        
        if (!response.ok) {
            throw new Error(updatedVenueData.errors?.[0]?.message ?? 'There was an error updating the venue');
        }
        
        queryClient.invalidateQueries('yourVenues');

        navigate('/YourVenues');
    } catch (error) {
        setError(error.toString());
    } finally {
        setIsLoading(false);
    }
}

  return (
    <div className="m-10">
      <h1 className="font-bold text-3xl mb-16 text-dark-blue">Edit Venue:</h1>
      <div className="flex m-10 mb-16">
        <div className="w-full max-w-md mx-auto">
          {venueIsLoading ? (
            <div>Loading...</div>
          ) : venueData ? (
            <EditForm onSubmit={onSubmit} isLoading={venueIsLoading} error={venueError} initialData={venueData} />
          ) : (
            <div>Error loading venue data: {venueError}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditVenueForm;



