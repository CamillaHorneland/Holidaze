import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ServerWarning from '../../shared/ServerWarning';
import ValidationMessage from '../../shared/ValidationMessage';
import { ALLVENUES_URL } from '../../../constant/api';
import { useNavigate } from 'react-router-dom';
import image from '../../../assets/Addvenuesign.png';
import { useUser } from '../../../hooks/type/UserContext';  

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

const schema = yup.object({
  name: yup.string().required('Venue name is required'),
  description: yup.string().required('Venue description is required'),
  media: yup.mixed().transform(value => (value === '' ? undefined : value.split(',')))
    .test('isValidMedia', 'Please enter a valid URL for venue media', value => {
      return !value || value.every(url => isValidUrl(url.trim()));
    })
    .nullable()
    .default([]),
  price: yup.number().required('Venue price is required'),
  maxGuests: yup.number().required('Max guests is required'),
  rating: yup.number().optional(),
  meta: yup.object().shape({
    wifi: yup.boolean().optional(),
    parking: yup.boolean().optional(),
    breakfast: yup.boolean().optional(),
    pets: yup.boolean().optional(),
  }),
});

function AddVenueForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useUser();  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
  const formattedData = {
    ...data,
    media: typeof data.media === 'string' ? data.media.split(',').map(url => url.trim()) : data.media,
  };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.accessToken}`,
    };

    const options = {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(formattedData),
    };

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(ALLVENUES_URL, options);
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.errors?.[0]?.message ?? 'There was an error');
      }

      console.log(json);

      navigate('/yourvenues');
    } catch (error) {
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex mt-8 m-4 items-center mb-16">
      <div className="hidden md:block">
        <img src={image} alt="Addvenue sign" className="w-70" />
      </div>
      <form className="w-full max-w-md mx-auto" onSubmit={handleSubmit((data) => onSubmit(data))}>
        <fieldset className={`flex flex-col p-8 space-y-6 ${isLoading && 'opacity-50'}`}>
          {error && <ServerWarning>{error}</ServerWarning>}
          
          <div className="form-control flex flex-col my-4">
            <label htmlFor="name" className="text-black mb-2">
              <span>Venue Name</span>
            </label>
            <input className="p-4 bg-light-blue border border-blue rounded-md" {...register('name')} />
            {errors?.name && <ValidationMessage>{errors.name.message}</ValidationMessage>}
          </div>

          <div className="form-control flex flex-col my-4">
            <label htmlFor="description" className="text-black mb-2">
              <span>Venue Description</span>
            </label>
            <input className="p-4 bg-light-blue border border-blue rounded-md" {...register('description')} />
            {errors?.description && <ValidationMessage>{errors.description.message}</ValidationMessage>}
          </div>

          <div className="form-control flex flex-col my-4">
            <label htmlFor="media" className="text-black mb-2">
              <span>Venue Media (URL)</span>
            </label>
             <input className="p-4 bg-light-blue border border-blue rounded-md" {...register('media')} />
             {errors?.media && <ValidationMessage>{errors.media.message}</ValidationMessage>}
             <p className="text-gray-500 text-sm mt-2">Separate image URLs with commas (,)</p>
          </div>

          <div className="form-control flex flex-col my-4">
            <label htmlFor="price" className="text-black mb-2">
              <span>Venue Price</span>
            </label>
            <input type="number" className="p-4 bg-light-blue border border-blue rounded-md" {...register('price')} />
            {errors?.price && <ValidationMessage>{errors.price.message}</ValidationMessage>}
          </div>

          <div className="form-control flex flex-col my-4">
            <label htmlFor="maxGuests" className="text-black mb-2">
              <span>Max Guests</span>
            </label>
            <input type="number" className="p-4 bg-light-blue border border-blue rounded-md" {...register('maxGuests')} />
            {errors?.maxGuests && <ValidationMessage>{errors.maxGuests.message}</ValidationMessage>}
          </div>

          <div className="form-control flex flex-col my-4">
            <label htmlFor="rating" className="text-black mb-2">
              <span>Rating</span>
            </label>
            <input type="number" className="p-4 bg-light-blue border border-blue rounded-md" {...register('rating')} />
            {errors?.rating && <ValidationMessage>{errors.rating.message}</ValidationMessage>}
          </div>

          <div className="form-control flex flex-col my-4">
            <label htmlFor="meta.wifi" className="text-black mb-2">
              <span>WiFi</span>
            </label>
            <select className="p-4 bg-light-blue border border-blue rounded-md" {...register('meta.wifi')}>
              <option value="">Select</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <div className="form-control flex flex-col my-4">
            <label htmlFor="meta.parking" className="text-black mb-2">
              <span>Parking</span>
            </label>
            <select className="p-4 bg-light-blue border border-blue rounded-md" {...register('meta.parking')}>
              <option value="">Select</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <div className="form-control flex flex-col my-4">
            <label htmlFor="meta.breakfast" className="text-black mb-2">
              <span>Breakfast</span>
            </label>
            <select className="p-4 bg-light-blue border border-blue rounded-md" {...register('meta.breakfast')}>
              <option value="">Select</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <div className="form-control flex flex-col my-4">
            <label htmlFor="meta.pets" className="text-black mb-2">
              <span>Pets</span>
            </label>
            <select className="p-4 bg-light-blue border border-blue rounded-md" {...register('meta.pets')}>
              <option value="">Select</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <div className="form-control flex flex-col my-4">
            <label htmlFor="location.address" className="text-black mb-2">
              <span>Address</span>
            </label>
            <input className="p-4 bg-light-blue border border-blue rounded-md" {...register('location.address')} />
            {errors?.location?.address && <ValidationMessage>{errors.location.address.message}</ValidationMessage>}
          </div>

          <div className="form-control flex flex-col my-4">
            <label htmlFor="location.city" className="text-black mb-2">
              <span>City</span>
            </label>
            <input className="p-4 bg-light-blue border border-blue rounded-md" {...register('location.city')} />
            {errors?.location?.city && <ValidationMessage>{errors.location.city.message}</ValidationMessage>}
          </div>

          <div className="form-control flex flex-col my-4">
            <label htmlFor="location.zip" className="text-black mb-2">
              <span>Zip Code</span>
            </label>
            <input className="p-4 bg-light-blue border border-blue rounded-md" {...register('location.zip')} />
            {errors?.location?.zip && <ValidationMessage>{errors.location.zip.message}</ValidationMessage>}
          </div>

          <div className="form-control flex flex-col my-4">
            <label htmlFor="location.country" className="text-black mb-2">
              <span>Country</span>
            </label>
            <input className="p-4 bg-light-blue border border-blue rounded-md" {...register('location.country')} />
            {errors?.location?.country && <ValidationMessage>{errors.location.country.message}</ValidationMessage>}
          </div>

          <div className="form-control flex flex-col my-4">
            <label htmlFor="location.continent" className="text-black mb-2">
              <span>Continent</span>
            </label>
            <input className="p-4 bg-light-blue border border-blue rounded-md" {...register('location.continent')} />
            {errors?.location?.continent && <ValidationMessage>{errors.location.continent.message}</ValidationMessage>}
          </div>

          <div className="text-black flex justify-center mt-6"></div>

          <div className="form-control my-6">
            <button className="bg-blue hover:bg-dark-blue text-white font-bold py-3 px-6 rounded-full" type="submit">
              {isLoading ? 'Creating Venue...' : 'Create Venue'}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default AddVenueForm;



