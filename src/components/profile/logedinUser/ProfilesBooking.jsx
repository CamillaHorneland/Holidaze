import React from 'react';
import { Link } from 'react-router-dom';
import { NEWBOOKING_URL, PROFILE_URL } from '../../../constant/api';
import { useUser } from '../../../hooks/type/UserContext';
import { format, differenceInDays } from 'date-fns';
import DefaultImage from '../../../assets/Default.png';
import DeleteButton from '../../delete/Delete';
import { useFetch } from '../../../hooks/useFetch';

function BookingProfileDetail() {
  const { user } = useUser();
const { data: bookingsData, isLoading, error } = useFetch(
  `${PROFILE_URL}/${user.name}/bookings?_venue=true`,
  {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  },
  [user.name, user.accessToken]
);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    if (error.message === 'No profile with this name') {
      return <div>No profile found with the name: {user.name}</div>;
    } else {
      return (
        <div>
          <div>An error has occurred: {error?.message || 'Unknown error'}</div>
        </div>
      );
    }
  }

  if (!bookingsData || bookingsData.length === 0) {
    return <div><h1 className="text-2xl font-bold text-dark-blue m-10 mb-10"> No data available for this profile or no bookings.</h1></div>;
  }

  const sortedBookings = bookingsData.sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
  const completedBookings = sortedBookings.filter((booking) => new Date(booking.dateTo) < new Date());

  return (
  <div>
    <h1 className="text-3xl font-bold text-dark-blue ml-10 mt-10">Your Bookings</h1>
    <p className='ml-12 mb-10 mt-2'>(Sorted by date)</p>
    <div className="mx-auto my-auto p-4 m-10 mb-16 p-16">
      
      {sortedBookings
        .filter((booking) => new Date(booking.dateTo) >= new Date())
        .map((booking) => (
          <div key={booking.id} className="flex flex-col bg-light-blue p-4 mb-4 rounded-md md:flex-row">
            <div className="flex-1">
              <h2 className='text-2xl font-bold mt-8 mb-8'>{booking.venue.name}</h2>
              <p className="font-bold">From:</p>
              <p>{format(new Date(booking.dateFrom), 'EEEE dd.MM.yyyy')}</p>
              <p className="font-bold mt-2">To:</p>
              <p>{format(new Date(booking.dateTo), 'EEEE dd.MM.yyyy')}</p>
              <p className="font-bold mt-2">Number of Nights:</p>
              <p>{Math.max(differenceInDays(new Date(booking.dateTo), new Date(booking.dateFrom)), 1)}</p>
              <p className="font-bold mt-2">Total Price:</p>
              <p>{differenceInDays(new Date(booking.dateTo), new Date(booking.dateFrom)) * booking.venue.price}</p>
              <p className="font-bold mt-2">Guests:</p>
              <p>{booking.guests}</p>
              <p className="font-bold mt-2">Booked:</p>
              <p>{format(new Date(booking.created), 'EEEE dd.MM.yyyy')}</p>
            </div>

            <div className="flex-1 relative md:order-1 md:mb-0 mb-4">
              <div className="max-h-96 overflow-hidden mb-2">
                {booking.venue.media.length > 0 ? (
                  <img className="w-full h-auto" src={booking.venue.media[0]} alt={`Venue ${booking.venue.name}`} />
                ) : (
                  <img className="w-full h-auto" src={DefaultImage} alt={`Default Venue Image`} />
                )}
              </div>
              <Link
                to={`/venuesspecific/${booking.venue.id}`}
                className="block bg-dark-blue mb-5 text-center text-white p-2 rounded-md hover:bg-white hover:text-dark-blue border border-dark-blue"
              >
                View Venues
              </Link>
              <DeleteButton
                onDelete={() => {}}
                user={user}
                apiEndpoint={`${NEWBOOKING_URL}/${booking.id}`}  
                invalidationKey={['data']}
              />
              <p className="text-red-500 mt-2">
                If you delete this booking later than 48 hours before the from date, you will still be charged for the booking.
              </p>
            </div>
          </div>
        ))}
      {completedBookings.length > 0 && (
  <>
    <h2 className="text-xl font-bold text-dark-blue mt-16 m-10">Completed Bookings</h2>
    {completedBookings.map((booking) => (
      <div key={booking.id} className="flex flex-col bg-light-blue p-4 mb-4 rounded-md md:flex-row">
        <div className="flex-1">
          <h2 className='text-2xl font-bold mt-8 mb-8'>{booking.venue.name}</h2>
          <p className="font-bold">From:</p>
          <p>{format(new Date(booking.dateFrom), 'EEEE dd.MM.yyyy')}</p>
          <p className="font-bold mt-2">To:</p>
          <p>{format(new Date(booking.dateTo), 'EEEE dd.MM.yyyy')}</p>
          <p className="font-bold mt-2">Number of Nights:</p>
          <p>{Math.max(differenceInDays(new Date(booking.dateTo), new Date(booking.dateFrom)), 1)}</p>
          <p className="font-bold mt-2">Total Price:</p>
          <p>{differenceInDays(new Date(booking.dateTo), new Date(booking.dateFrom)) * booking.venue.price}</p>
          <p className="font-bold mt-2">Guests:</p>
          <p>{booking.guests}</p>
          <p className="font-bold mt-2">Booked:</p>
          <p>{format(new Date(booking.created), 'EEEE dd.MM.yyyy')}</p>
        </div>

        <div className="flex-1 relative md:order-1 md:mb-0 mb-4">
          <div className="max-h-96 overflow-hidden mb-2">
            {booking.venue.media.length > 0 ? (
              <img className="w-full h-auto" src={booking.venue.media[0]} alt={`Venue ${booking.venue.name}`} />
            ) : (
              <img className="w-full h-auto" src={DefaultImage} alt={`Default Venue Image`} />
            )}
          </div>
          <Link
            to={`/venuesspecific/${booking.venue.id}`}
            className="block bg-dark-blue mb-5 text-center text-white p-2 rounded-md hover:bg-white hover:text-dark-blue border border-dark-blue"
          >
            View Venues
          </Link>
          <DeleteButton
            onDelete={() => {}}
            user={user}
            apiEndpoint={`${NEWBOOKING_URL}/${booking.id}`}
            invalidationKey={['data']}
          />
        </div>
      </div>
    ))}
  </>
)}
        
      </div>
  </div>
 );
}

export default BookingProfileDetail;










