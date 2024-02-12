import React from 'react';
import { PROFILE_URL } from '../../constant/api';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../type/UserContext';
import { format } from 'date-fns';
;

async function GetBookings(name, user) {
  try {
    const url = `${PROFILE_URL}/${name}/bookings`;

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
    throw error;
  }
}

function BookingProfileDetail() { 
  const { user, setUser } = useUser();
  const { isFetching, isError, data: bookingsData } = useQuery({
    queryKey: ['data'],
    queryFn: () => GetBookings(user.name, user),
    staleTime: 1000 * 60 * 5,
  });
  


  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    if (isError.message === 'No profile with this name') {
      return <div>No profile found with the name: {user.name}</div>;
    } else {
      return (
        <div>
          <div>An error has occurred: {isError?.message || 'Unknown error'}</div>
        </div>
      );
    }
  }

  if (!bookingsData || bookingsData.length === 0) {
    return <div>No data available for this profile or no bookings.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark-blue m-10 mb-10">Your Bookings</h1>
      <div className="mx-auto my-auto p-4 m-10 mb-16 p-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <div className="mb-4 m-10 mx-auto my-auto">
          {bookingsData.map((booking) => (
            <div key={booking.id} className="bg-light-blue p-4 mb-4 rounded-md">
              <p className="font-bold">From:</p>
              <p>{format(new Date(booking.dateFrom), 'EEEE dd.MM.yyyy')}</p>
              <p className="font-bold mt-2">To:</p>
              <p>{format(new Date(booking.dateTo), 'EEEE dd.MM.yyyy')}</p>
              <p className="font-bold mt-2">Guests:</p>
              <p>{booking.guests}</p>
              <p className="font-bold mt-2">Booked:</p>
              <p>{format(new Date(booking.created), 'EEEE dd.MM.yyyy')}</p>

              {/* <p className="font-bold mt-2">Venue Name:</p>
              <p>{venueData.name}</p>
              <p className="font-bold mt-2">Venue Price:</p>
              <p>{venueData.price}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookingProfileDetail;






