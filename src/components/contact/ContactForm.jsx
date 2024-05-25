import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import ImageBack from '../landing/background';

// Definer skjema for yup-validering
const schema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  body: yup
    .string()
    .min(3, 'Body must be at least 3 characters')
    .required('Body is required'),
}).required();

function ContactForm() {
  const navigate = useNavigate();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Initialiser react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    localStorage.setItem('contactForm', JSON.stringify(data));

    console.log(data);

    setIsFormSubmitted(true);
  };

  return (
    <div className=" m-10">
      <h1 className="text-3xl font-bold mb-6 text-dark-blue">
        Contact us
      </h1>
      <div className=" text-center w-full ">
        {isFormSubmitted ? (
          <div>
            <h2 className="text-dark-blue text-2xl mt-16">Your message was sent</h2>
            <button
              onClick={() => navigate('/')}
              className="bg-dark-blue text-white py-4 px-10 rounded-full cursor-pointer
              transition duration-300 ease-in-out hover:bg-blue m-8 w-64 mt-10">
              Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto rounded-lg">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 m-20">
            </label>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              {...register('email')}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            <label htmlFor="body" className="block mt-4 text-sm font-medium text-gray-700 m-8">
            </label>
            <textarea
              name="body"
              placeholder="Your message"
              {...register('body')}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            />
            {errors.body && <p className="text-red-500">{errors.body.message}</p>}

            <button
              type="submit"
              className="bg-dark-blue text-white py-4 px-10 rounded-full cursor-pointer
              transition duration-300 ease-in-out hover:bg-blue m-8 w-64">
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ContactForm;





