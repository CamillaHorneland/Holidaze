import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ServerWarning from '../../../shared/ServerWarning';
import ValidationMessage from '../../../shared/ValidationMessage';

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
  rating: yup.number(),
  meta: yup.object().shape({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
  }),
  location: yup.object().shape({
    address: yup.string().default("Unknown"),
    city: yup.string().default("Unknown"),
    zip: yup.string().default("Unknown"),
    country: yup.string().default("Unknown"),
    continent: yup.string().default("Unknown"),
  }),
});

  function VenueForm({ onSubmit, isLoading, error }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  return (

    <form className="w-full max-w-md mx-auto" onSubmit={handleSubmit((data) => onSubmit(data))}>
        <fieldset className={`flex flex-col p-8 space-y-6 ${isLoading && 'opacity-50'}`}>
          {error && <ServerWarning>{error}</ServerWarning>}
          
          <div className="form-control flex flex-col my-4">
            <label htmlFor="name" className="text-black mb-2">
              <span>Venue Name</span>
            </label>
            <input className="p-4 bg-light-blue border border-blue rounded-md" {...register('name')} />
            {errors?.name && <ValidationMessage>{errors.name.message}</ValidationMessage>}
            <p className="text-gray-500 text-sm mt-2">*Required</p>
          </div>

          <div className="form-control flex flex-col my-4">
            <label htmlFor="description" className="text-black mb-2">
              <span>Venue Description</span>
            </label>
            <input className="p-4 bg-light-blue border border-blue rounded-md" {...register('description')} />
            {errors?.description && <ValidationMessage>{errors.description.message}</ValidationMessage>}
            <p className="text-gray-500 text-sm mt-2">*Required</p>
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
            <p className="text-gray-500 text-sm mt-2">*Required</p>
          </div>

          <div className="form-control flex flex-col my-4">
            <label htmlFor="maxGuests" className="text-black mb-2">
              <span>Max Guests</span>
            </label>
            <input type="number" className="p-4 bg-light-blue border border-blue rounded-md" {...register('maxGuests')} />
            {errors?.maxGuests && <ValidationMessage>{errors.maxGuests.message}</ValidationMessage>}
            <p className="text-gray-500 text-sm mt-2">*Required</p>
          </div>

          <div className="form-control flex flex-col my-4">
            <label htmlFor="rating" className="text-black mb-2">
              <span>Rating</span>
            </label>
            <select className="p-4 bg-light-blue border border-blue rounded-md" {...register('rating')}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            {errors?.rating && <ValidationMessage>{errors.rating.message}</ValidationMessage>}
          </div>

          <div className="form-control flex flex-col my-4">
            <label htmlFor="meta.wifi" className="text-black mb-2">
              <span>WiFi</span>
            </label>
            <select className="p-4 bg-light-blue border border-blue rounded-md" {...register('meta.wifi')}>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>

          <div className="form-control flex flex-col my-4">
            <label htmlFor="meta.parking" className="text-black mb-2">
              <span>Parking</span>
            </label>
            <select className="p-4 bg-light-blue border border-blue rounded-md" {...register('meta.parking')}>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>

          <div className="form-control flex flex-col my-4">
            <label htmlFor="meta.breakfast" className="text-black mb-2">
              <span>Breakfast</span>
            </label>
            <select className="p-4 bg-light-blue border border-blue rounded-md" {...register('meta.breakfast')}>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>

          <div className="form-control flex flex-col my-4">
            <label htmlFor="meta.pets" className="text-black mb-2">
              <span>Pets</span>
            </label>
            <select className="p-4 bg-light-blue border border-blue rounded-md" {...register('meta.pets')}>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
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
   
  );
}

export default VenueForm;
