import React from 'react';
import { ALLVENUES_URL } from '../../constant/api';
import { Link } from 'react-router-dom';
import DefaultImage from '../../assets/Default.png';
import VenueFilter from './VenueFilter';
import { useFetch } from '../../hooks/useFetch';

const AllVenues = () => {
  const { data: venues, isLoading, error } = useFetch(ALLVENUES_URL, {}, [], 1000 * 60 * 5);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error has occurred: {error.message || 'Unknown error'}</div>;
  }

  return (
    <div className='mb-16 m-10'>
      <h1 className="text-3xl font-bold mb-6 text-dark-blue">Venues</h1>
       <div className="mb-16">
        <VenueFilter />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {venues?.map((venue) => {
          return (
            <div
              key={venue.id}
              className="card bg-light-blue p-4 rounded-md shadow-md mb-4"
            >
              <h2 className="text-xl font-bold mb-2 h-16 overflow-hidden">{venue.name}</h2>
              {venue.media && venue.media.length > 0 && typeof venue.media[0] === 'string' ? (
                <img
                  src={venue.media[0].split(',')[0]}
                  alt={venue.name}
                  className="w-full h-48 object-cover mb-2 rounded-md"
                  onError={(e) => {
                    e.target.src = DefaultImage;
                  }}
                />
              ) : (
                <img
                  src={DefaultImage}
                  alt={venue.name}
                  className="w-full h-48 object-cover mb-2 rounded-md"
                />
              )}
              <p className="text-gray-700 mb-2">Rating: {venue.rating}</p>
              <p className="text-gray-700 mb-2 h-8">
                {venue.location.country && <span>Country: {venue.location.country}</span>}
              </p>
              <p className="text-gray-700 mb-4 h-8">
                {venue.location.city && <span>City: {venue.location.city}</span>}
              </p>
              <Link
                to={`/venuesspecific/${venue.id}`}
                className="block bg-dark-blue text-center text-white p-2 rounded-md hover:bg-white hover:text-dark-blue border border-dark-blue"
              >
                View Venues
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllVenues;

