// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { ALLVENUES_URL } from '../../constant/api';
// import { useQuery } from '@tanstack/react-query';
// import DefaultImage from '../../assets/Default.png';
// import PropTypes from 'prop-types';

// async function getVenue(id) {
//   const response = await fetch(`${ALLVENUES_URL}/${id}`);

//   if (!response.ok) {
//     throw new Error('There was an error fetching the venue');
//   }

//   return response.json();
// }

// function VenueCard({ venueId }) {
  
//   const { isPending, error, data } = useQuery({
//     queryKey: ['venue', venueId],
//     queryFn: () => getVenue(venueId),
//     staleTime: 1000 * 60 * 5,
//   });

//   if (isPending) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>An error has occurred: {error.message || "Unknown error"}</div>;
//   }

//   return (
//     <div className="mx-auto p-4 m-10 mb-16 p-16">
//       {data && (
//         <>
//           <h3 className="text-3xl font-bold text-dark-blue m-10 mb-10">{data.name}</h3>

//           <div className='h-1/5 sm:w-4/4 md:w-3/4 lg:w-2/4 m-10 mb-10 overflow-hidden'>
//             <img
//               src={
//                 data.media.length > 0
//                   ? data.media[0]
//                   : DefaultImage
//               }
//               alt={data.name}
//               className='rounded-md'
//             />
//           </div>
//           <div className="mb-4 m-10">
//             <h3 className="text-lg font-bold">Price:</h3> {data.price} EUR each night.
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// // Definer propstypene direkte i koden
// VenueCard.propTypes = {
//   venueId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
// };

// export default VenueCard;


