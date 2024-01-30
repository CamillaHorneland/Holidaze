import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ALLVENUES_URL } from '../../constant/api';
import { useQuery } from '@tanstack/react-query';
import { MdPets, MdFreeBreakfast } from 'react-icons/md';
import { FaParking, FaWifi } from 'react-icons/fa';
import DefaultImage from '../../assets/Default.png';

async function getVenue(id) {
  const response = await fetch(`${ALLVENUES_URL}/${id}`);

  if (!response.ok) {
    throw new Error('There was an error fetching the venue');
  }

  return response.json();
}

function VenueDetail() {
  const { id } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ['venue', id],
    queryFn: () => getVenue(id),
    staleTime: 1000 * 60 * 5,
  });

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

 

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return 'An error has occurred: ' + error.message;

 

  return (
    <div className=" mx-auto p-4 mb-16 p-16">
      {data && (
        <>
          <h1 className="text-3xl font-bold text-dark-blue mb-10">{data.name}</h1>

          <div className='sm:w-4/4 md:w-4/4 lg:w-4/4 lg:pr-4 mb-10'>
            <img
              src={
                selectedImageIndex !== null && data.media.length > 0
                  ? data.media[selectedImageIndex]
                  : DefaultImage
                 
              }
              alt={data.name}
              className='w-full h-auto md:h-45 lg:h-30 object-over rounded-md'
            />

            {data.media.length > 1 && (
              <div className='flex flex-wrap justify-center lg:justify-center '>
                {data.media.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className='w-2/4 cursor-pointer p-2'>
                    <img src={image} alt={data.name}className='w-full h-auto object-cover rounded-md'/>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold">Description:</h3> {data.description}
          </div>

          <div className="mb-5 bg-light-blue p-5">
            <h3 className="text-lg font-bold mb-3">Location:</h3>

            {data.location.address && <p className="mb-2">Address: {data.location.address}</p>}
            {data.location.city && <p className="mb-2">City: {data.location.city}</p>}
            {data.location.country && <p className="mb-2">Country: {data.location.country}</p>}
            {data.location.continent && <p className="mb-2">Continent: {data.location.continent}</p>}
            {!data.location.address && !data.location.city && !data.location.country && !data.location.continent && (
              <p className="mb-2">
                Contact Holidaze for location info of this venue.{' '}
                <a href="/contact" className="text-blue-500 hover:underline">
                  Contact Holidaze
                </a>
              </p>
            )}
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold">Rating:</h3> {data.rating}
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold">Price:</h3> {data.price} EUR each night.
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold">Max Guests:</h3> {data.maxGuests}
          </div>

          <div className="mb-5 border border-dark-blue">
            <h3 className="text-lg font-bold mb-3">Facilities:</h3>
            <ul className="list-none p-0 m-0">
              <li className={`flex items-center m-3 ${data.meta.wifi ? '' : 'line-through'}`}>
                <FaWifi className="mr-2 text-dark-blue" />Wifi: {data.meta.wifi ? 'Yes' : 'No'}
              </li>
              <li className={`flex items-center m-3 ${data.meta.parking ? '' : 'line-through'}`}>
                <FaParking className="mr-2 text-dark-blue" />Parking: {data.meta.parking ? 'Yes' : 'No'}
              </li>
              <li className={`flex items-center m-3 ${data.meta.breakfast ? '' : 'line-through'}`}>
                <MdFreeBreakfast className="mr-2 text-dark-blue" />Breakfast: {data.meta.breakfast ? 'Yes' : 'No'}
              </li>
              <li className={`flex items-center m-3 ${data.meta.pets ? '' : 'line-through'}`}>
                <MdPets className="mr-2 text-dark-blue" />Pets: {data.meta.pets ? 'Yes' : 'No'}
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default VenueDetail;
