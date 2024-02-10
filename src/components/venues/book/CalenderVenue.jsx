import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { ALLVENUES_URL } from '../../../constant/api';
import { useQuery } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import nb from 'date-fns/locale/nb';
import ConfirmationModal from './ConfirmationModal';
import { useUser } from '../../type/UserContext';

async function getBookingDetail(venueId) {
  try {
    const response = await fetch(`${ALLVENUES_URL}/${venueId}?_bookings=true`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error parsing JSON response');
  }
}

const BookingDetail = ({ venueId }) => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [excludedDates, setExcludedDates] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const { user } = useUser();
 
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const { data: bookingData, isLoading: isBookingLoading, isError: isBookingError } = useQuery({
    queryKey: ['booking', venueId],
    queryFn: () => getBookingDetail(venueId),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (bookingData && bookingData.bookings) {
      const newExcludedDates = bookingData.bookings.map((booking) => ({
        startDate: new Date(booking.dateFrom),
        endDate: new Date(booking.dateTo),
      }));

      const flattenedExcludedDates = newExcludedDates.flatMap(({ startDate, endDate }) => {
        const dates = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
      });

      setExcludedDates(flattenedExcludedDates);
    }
  }, [bookingData]);

  return (
    <>
      {user && user.role === 'guest' ? (
        <div className="bg-blue m-10 pb-20">
          <h3 className="text-lg font-bold p-5">Book this venue:</h3>
          <p className="text-white m-4">You have to login to book a venue. <NavLink to="/login" className="text-white font-bold ml-5">Login here.</NavLink></p>
        </div>
      ) : (
        bookingData && (
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
                  excludeDates={excludedDates}
                  selectsRange
                  monthsShown={2}
                  selectsDisabledDaysInRange
                  minDate={new Date()}
                  inline
                  locale={nb}
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
                  className="align-center p-2 block border border-gray-300 rounded-md"
                />
                <p className="text-light-blue m-4">(Max guest for this venue {bookingData.maxGuests})</p>
                <button
                  className="hover:bg-light-blue bg-blue border-2 border-light-blue m-2 text-black font-bold py-2 p-4 rounded-full w-full"
                  onClick={() => setModalOpen(true)}
                >
                  Go to booking
                </button>
              </div>
            </div>
          </div>
        )
      )}

      {isModalOpen && (
        <ConfirmationModal
          startDate={startDate}
          endDate={endDate}
          guests={guests}
          venueId={venueId}
          onClose={() => setModalOpen(false)}
          price={bookingData.price}
        />
      )}
    </>
  );
};

export default BookingDetail;





