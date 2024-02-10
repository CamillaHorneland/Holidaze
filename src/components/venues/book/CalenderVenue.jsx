import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ALLVENUES_URL } from '../../../constant/api';
import { useQuery } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from "date-fns";

async function getVenue(id) {
  const response = await fetch(`${ALLVENUES_URL}/${id}`);

  if (!response.ok) {
    throw new Error('There was an error fetching the venue');
  }

  return response.json();
}

async function getBookingDetail(id) {
  const response = await fetch(`${ALLVENUES_URL}/${id}?_bookings=true`);

  if (!response.ok) {
    throw new Error('There was an error fetching booking details');
  }

  return response.json();
}

const BookingDetail = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);


  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };


  const { data: bookingData, isLoading: isBookingLoading, isError: isBookingError } = useQuery({
    queryKey: ['booking', id],
    queryFn: () => getBookingDetail(id),
    staleTime: 1000 * 60 * 5,
  });

  const isDateBooked = (date) => {
    if (bookingData && bookingData.bookings) {
      return bookingData.bookings.some((booking) => {
        const bookingStartDate = new Date(booking.dateFrom);
        const bookingEndDate = new Date(booking.dateTo);
        return date >= bookingStartDate && date <= bookingEndDate;
      });
    }
    return false;
  };

  const handleBookingUpdate = async (startDate, endDate, guests) => {
    try {
      const response = await fetch(`${ALLVENUES_URL}/${id}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: startDate,
          endDate: endDate,
          guests: guests,
        }),
      });

      if (!response.ok) {
        throw new Error('There was an error updating the booking');
      }

      console.log('Booking updated successfully');
    } catch (error) {
      console.error('Error updating booking:', error.message || 'Unknown error');
    }
  };

  if (isBookingLoading) {
    return <div>Loading...</div>;
  }

  if (isBookingError) {
    return <div>An error has occurred: {isBookingError.message || 'Unknown error'}</div>;
  }
  
  return (
    <>
    {bookingData && (
    <div className="bg-blue m-10 pb-20">
      <h3 className="text-lg font-bold p-5">Book this venue:</h3>
      <div className="flex flex-wrap p-4 space-between justify-center">

        <div className="mb-4 sm:mb-0">
          <DatePicker
            id="startDate"
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
            selectsRange
            monthsShown={2}
            selectsDisabledDaysInRange
            inline
          />
        </div>

        <div className="mt-5 ml-10">
          <label htmlFor="guests" className="block text-gray-700">
            Guests:
          </label>
          <input
            type="number"
            id="guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min={1}
            max={bookingData.maxGuests}
            className=" align-center p-2 block border border-gray-300 rounded-md"
          />
          <p className="text-light-blue m-4">(Max guest for this venue {bookingData.maxGuests})</p>
          <button
            className="hover:bg-light-blue bg-blue border-2 border-light-blue m-2 text-black font-bold py-2 p-4 rounded-full w-full "
            onClick={() => handleBookingUpdate(startDate, endDate, guests)}
          >
            Go to booking
          </button>
        </div>
      </div>
     </div>
    )}
   </>
  );
};

export default BookingDetail;