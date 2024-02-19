import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROFILE_URL, ALLVENUES_URL } from '../../../constant/api';
import { useUser } from '../../../hooks/type/UserContext';
import { useFetch } from '../../../hooks/useFetch';
import { format } from 'date-fns';
import DefaultImage from '../../../assets/Default.png';
import DeleteButton from '../../delete/Delete';

function YourVenues() {
  const { name: profileName } = useParams();
  const { user, setUser } = useUser();
  const { data: venuesData, isLoading, error } = useFetch(
    `${PROFILE_URL}/${user.name}/venues?_bookings=true`,
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

   if (!venuesData || venuesData.length === 0) {
    return <div><h1 className="text-2xl font-bold text-dark-blue m-10 mb-10">No venues available for this profile.</h1></div>;
  }

 
  return (
  <div>
    <h1 className="text-3xl font-bold text-dark-blue m-10 mb-10">Your Venues</h1>
    <div className="mx-auto my-auto p-4 m-10 mb-16 p-16">

      {venuesData.map((venue) => (
        <div key={venue.id} className="bg-light-blue p-4 mb-4 rounded-md">
          <div className="flex flex-col md:flex-row"> 
            <div className="flex-1">
              <h2 className='text-2xl font-bold mt-8 mb-8'>{venue.name}</h2>
              <p className="font-bold">Description:</p>
              <p>{venue.description}</p>
              <p className="font-bold mt-2">Max Guests:</p>
              <p>{venue.maxGuests}</p>
              <p className="font-bold mt-2">Price:</p>
              <p>{venue.price}</p>
              <p className="font-bold mt-2">Created:</p>
              <p>{format(new Date(venue.created), 'EEEE dd.MM.yyyy')}</p>
            </div>

            <div className="flex-1 relative md:order-1 md:mb-0 mb-4">
              <div className="max-h-96 overflow-hidden mb-2">
                {venue.media.length > 0 ? (
                  <img className="w-full h-auto" src={venue.media[0]} alt={`Venue ${venue.name}`} />
                ) : (
                  <img className="w-full h-auto" src={DefaultImage} alt={`Default Venue Image`} />
                )}
              </div>
              <Link
                to={`/venuesspecific/${venue.id}`}
                className="block bg-dark-blue text-center text-white p-2 rounded-md hover:bg-white hover:text-dark-blue border border-dark-blue mb-2"
              >
                View Venue
              </Link>
              <div className='flex'>
                <div className="flex-1 m-2">
                  <Link
                    to={`/edityourvenue/${venue.id}`} 
                    className="block bg-blue text-center text-white p-2 rounded-md hover:bg-white hover:text-dark-blue border border-blue w-full"
                  >
                    Edit Venue
                  </Link>
                </div>
                <div className="flex-1 m-2">
                  <DeleteButton
                    onDelete={() => {}}
                    user={user}
                    apiEndpoint={`${ALLVENUES_URL}/${venue.id}`}  
                    invalidationKey={['data']}
                  />
                </div>
              </div>
            </div>
          </div>

          {venue.bookings && venue.bookings.length > 0 ? (
            <div className="mt-4">
              <h3 className="text-lg font-bold">Bookings:</h3>
              <ul>
                {venue.bookings.map((booking) => (
                  <li key={booking.id} className='m-5 mb-8'>
                    <p>Date From: {format(new Date(booking.dateFrom), 'EEEE dd.MM.yyyy')}</p>
                    <p>Date To: {format(new Date(booking.dateTo), 'EEEE dd.MM.yyyy')}</p>
                    <p>Guests: {booking.guests}</p>
                    <p>Created: {format(new Date(booking.created), 'EEEE dd.MM.yyyy')}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="m-8">There are no bookings on this venue at this time.</p>
          )}
          
        </div>
      ))}
    </div>
  </div>
 );
}

export default YourVenues;

