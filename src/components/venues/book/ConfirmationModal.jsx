import React, { useState } from 'react';
import { format, differenceInDays } from 'date-fns';
import { NEWBOOKING_URL } from '../../../constant/api';
import { useUser } from '../../../hooks/type/UserContext';
import { NavLink } from 'react-router-dom';

async function createBooking({ dateFrom, dateTo, guests, venueId, user }) {
  try {
    if (!user || !user.accessToken) {
      throw new Error('User is not defined or missing access token.');
    }

    const response = await fetch(NEWBOOKING_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({
        dateFrom,
        dateTo,
        guests,
        venueId,
      }),
    });

    if (!response.ok) {
      throw new Error('Booking failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('Error creating booking: ' + error.message);
  }
}

function ConfirmationModal({ startDate, endDate, guests, venueId, onClose, price  }) {
  const [isConfirming, setConfirming] = useState(false);
  const [isBookingComplete, setBookingComplete] = useState(false);
  const [bookingErrorMessage, setBookingErrorMessage] = useState('');

  const { user } = useUser();
  
  const formattedStartDate = format(new Date(startDate), 'EEEE dd.MM.yyyy');
  const formattedEndDate = format(new Date(endDate), 'EEEE dd.MM.yyyy');
  const numberOfNights = differenceInDays(new Date(endDate), new Date(startDate));
  const totalCost = price * numberOfNights;

  const handleBookingConfirm = async () => {
    try {
      setConfirming(true);

      if (!user || !user.accessToken) {
        throw new Error('User is not defined or missing access token.');
      }

      await createBooking({
        dateFrom: startDate,
        dateTo: endDate,
        guests,
        venueId,
        user,
      });

      setBookingComplete(true);
    } catch (error) {
      console.error('Error confirming booking:', error);

      if (error.message.includes('Booking failed')) {
        setBookingErrorMessage('Problem completing this booking. Try again or choose different dates.');
      } else {
        setBookingErrorMessage('An error occurred while confirming the booking. Please try again.');
      }
    } finally {
      setConfirming(false);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg text-dark-blue font-bold mb-4">Complete Booking</h2>
        <h3 className='font-bold mb-4'>Selected booking dates:</h3>
        <p className='mb-2'>From: {formattedStartDate}</p> 
        <p className='mb-2'>To: {formattedEndDate}</p>
        <p className='mb-2'>Guests: {guests}</p>
        <p className='mb-2'>Number of nights: {numberOfNights}</p>
        <p className='font-bold'>Total cost: {totalCost} EUR</p>
        {isBookingComplete && (
          <h3 className="text-dark-blue mt-4">Booking complete!</h3>
        )}
        {bookingErrorMessage && (
          <p className="text-red-500 mt-4">{bookingErrorMessage}</p>
        )}
        <div className="mt-6">
          {!isBookingComplete ? (
            <>
              <button
                onClick={handleBookingConfirm}
                disabled={isConfirming}
                className={`bg-blue hover:bg-dark-blue text-white py-2 px-4 rounded ${
                  isConfirming ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isConfirming ? 'Confirming...' : 'Confirm Booking'}
              </button>
              <button
                onClick={onClose}
                className="ml-2 bg-blue hover:bg-dark-blue text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onClose}
                disabled={isConfirming}
                className="bg-blue hover:bg-dark-blue text-white py-2 px-4 rounded"
              >
                Close
              </button>
              <NavLink to="/bookings">
                <button
                  className="ml-2 bg-blue hover:bg-dark-blue text-white py-2 px-4 rounded"
                >
                  Go to Bookings
                </button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
 );
}

export default ConfirmationModal;





















