import React, { useState } from 'react';
import { NEWBOOKING_URL } from '../../../constant/api';
import { useUser } from '../../type/UserContext';

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

function ConfirmationModal({ startDate, endDate, guests, venueId, onClose }) {
  const [isConfirming, setConfirming] = useState(false);
  const [isBookingComplete, setBookingComplete] = useState(false);

  const { user } = useUser();

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
     
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-lg font-bold mb-4">Booking Confirmation</h3>
        <p>Date: {startDate.toString()} to {endDate.toString()}</p>
        <p>Guests: {guests}</p>
        {isBookingComplete && (
          <p className="text-green-500 mt-4">Booking complete!</p>
        )}
        <div className="mt-6">
          {!isBookingComplete ? (
            <button
              onClick={handleBookingConfirm}
              disabled={isConfirming}
              className={`bg-blue text-white py-2 px-4 rounded ${
                isConfirming ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isConfirming ? 'Confirming...' : 'Confirm Booking'}
            </button>
          ) : (
            <button
              onClick={onClose}
              disabled={isConfirming}
              className="bg-blue text-white py-2 px-4 rounded"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;



















