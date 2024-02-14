import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ALLVENUES_URL } from '../../../constant/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import nb from 'date-fns/locale/nb';
import ConfirmationModal from './ConfirmationModal';
import { useUser } from '../../../hooks/type/UserContext';
import { useFetch } from '../../../hooks/useFetch';


const BookingDetail = ({ venueId }) => {
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

     const { data: bookingData, error, isLoading } = useFetch(`${ALLVENUES_URL}/${venueId}?_bookings=true`);

  useEffect(() => {
      if (error) {
      console.error("Error fetching data:", error);
    }
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

    }, [bookingData, error]);

  return (
  <>
    <div className="bg-blue m-10 pb-20">
      <h3 className="text-lg font-bold p-5">Book this venue:</h3>
      {bookingData && (
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
            <label htmlFor="guests" className="block text-gray-700 sm:m-auto">
              Guests:
            </label>
            <select
                id="guests"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                className="p-4 bg-light-blue border border-blue rounded-md w-24"
            >
              {Array.from({ length: bookingData.maxGuests }, (_, i) => i + 1).map((option) => (
              <option key={option} value={option}>
                {option}
                </option>
              ))}
            </select>
            <p className="text-light-blue m-4 sm:text-center">(Max guest for this venue {bookingData.maxGuests})</p>
            
            {user && user.role === 'guest' ? (
              <p className="text-white sm:text-center">
                You have to login to book a venue. <NavLink to="/login" className="text-white font-bold m-3 sm:text-center">Login here.</NavLink>
              </p>
            ) : (
              <button
                className="hover:bg-light-blue bg-blue border-2 border-light-blue m-2 text-black font-bold py-2 p-4 rounded-full w-full"
                onClick={() => setModalOpen(true)}
              >
                Go to booking
              </button>
            )}
          </div>
        </div>
      )}
    </div>

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





