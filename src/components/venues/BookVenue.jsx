import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingForm = ({ onSubmit }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onSubmitHandler = (data) => {
    
    const bookingData = {
      ...data,
      date: selectedDate.toISOString(), 
    };

    onSubmit(bookingData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <label>
        Name:
        <input {...register('name')} />
      </label>
      {/* Legg til andre ting */}

      <label>
        Pick date:
        <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
      </label>

      <button className='bg-blue hover:bg-dark-blue text-white font-bold py-2 px-4 rounded-full w-52' type="submit">Book Venue</button>
    </form>
  );
};
export default BookingForm;
