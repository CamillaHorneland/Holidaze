// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { ALLVENUES_URL } from '../../constant/api';

// async function GetHost(id, includeOwner = false) {
//   try {
//     const ownerParam = includeOwner ? '_owner=true' : '';
//     const queryParams = [ownerParam].filter(Boolean).join('&');
//     const url = `${ALLVENUES_URL}/${id}${queryParams ? `?${queryParams}` : ''}`;

//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error('There was an error fetching host');
//     }

//     return response.json();
//   } catch (error) {
//     console.error('Error fetching host:', error.message);
//     throw error;
//   }
// }


// function HostInfo() {
//   const { isPending, error, data: data, isFetching } = useQuery({
//   queryKey: ['data'],
//   queryFn: GetHost,
//   staleTime: 1000 * 60 * 5,
// });

// console.log('responseData:', data);

// if (isPending) {
//   return <div>Loading...</div>;
// }

// if (error) {
//   return <div>An error has occurred: {error.message || 'Unknown error'}</div>;
// }

// return (
//   <div>
//     {data && data.length > 0 && (
//       <div>
//         <h3 className="text-lg font-bold">Hosts:</h3>
//         {data.map((data) => (
//           <div key={data.id}>
//             <h4>{data.name}</h4>
//             <p>Owner: {data.owner.name}</p>
//             <p>Email: {data.owner.email}</p>
//             <p>Avatar: {data.owner.avatar}</p>
//             <hr />
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// );
// }

// export default HostInfo;






