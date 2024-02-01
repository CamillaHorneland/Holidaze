import React, { useState } from 'react';
import ImageBack from '../landing/background';
import { useNavigate } from 'react-router-dom';

function ContactForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  function onFormSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      const formData = {
        email,
        body,
      };

      console.log(formData);

      // Sett isFormSubmitted til true
      setIsFormSubmitted(true);

      setEmail('');
      setBody('');
    }
  }

  function onTextInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'body') {
      setBody(value);
    }
  }

  function validateForm() {
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    if (body.length < 3) {
      alert('Body must be at least 3 characters.');
      return false;
    }

    return true;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <div className="relative m-10">
      <h1 className="text-3xl font-bold mb-6 text-dark-blue">
        Contact us
      </h1>
      <ImageBack big />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full z-20">
        {isFormSubmitted ? (
          <div>
            <h2 className="text-white text-2xl mt-16">Your message was sent</h2>
            <button
              onClick={() => navigate('/')}
              className="bg-dark-blue text-white py-4 px-10 rounded-full cursor-pointer
              transition duration-300 ease-in-out hover:bg-blue m-8 w-64 mt-10">
              Home
            </button>
          </div>
        ) : (
          <form onSubmit={onFormSubmit} className="max-w-md mx-auto rounded-lg">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 m-8">
            </label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Your email"
              onChange={onTextInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md"
              required
            />

            <label htmlFor="body" className="block mt-4 text-sm font-medium text-gray-700 m-8">
            </label>
            <textarea
              name="body"
              value={body}
              placeholder="Your message"
              onChange={onTextInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md"
              required
            />

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




