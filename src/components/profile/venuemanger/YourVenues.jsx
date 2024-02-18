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
    `${PROFILE_URL}/${user.name}/venues`,
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

  if (!venuesData) {
    return <div>No venues available for this profile.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark-blue m-10 mb-10">Your Venues</h1>
      <div className="mx-auto my-auto p-4 m-10 mb-16 p-16">
        {venuesData.map((venue) => (
          <div key={venue.id} className="flex flex-col bg-light-blue p-4 mb-4 rounded-md md:flex-row">
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
                <div className="flex-1">
                  <Link
                    to={`/edityourvenue/${venue.id}`} 
                    className="block bg-dark-blue text-center text-white m-5 p-2 rounded-md hover:bg-white hover:text-dark-blue border border-dark-blue "
                  >
                    Edit Venue
                  </Link>
                </div>
                <div className="flex-1">
                  <DeleteButton
                    onDelete={() => {}}
                    user={user}
                    apiEndpoint={`${ALLVENUES_URL}/${venue.id}`}  
                    invalidationKey={['data']}
                    className="flex p-2 w-full border"
                  />
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default YourVenues;
