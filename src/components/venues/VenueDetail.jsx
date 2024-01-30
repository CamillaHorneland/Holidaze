import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { ALLVENUES_URL } from "../../constant/api";
import { useQuery } from "@tanstack/react-query";
import DefaultImage from '../../assets/Default.png';
import { MdPets, MdFreeBreakfast } from "react-icons/md";
import { FaParking, FaWifi } from "react-icons/fa";

async function getVenue(id) {
	const response = await fetch(`${ALLVENUES_URL}/${id}`);

	if (!response.ok) {
		throw new Error("There was an error fetching the venue");
	}

	return response.json();

} 

function VenueDetail() {
	const { id } = useParams();

	const { isPending, error, data } = useQuery({
		queryKey: ["venue", id],
		queryFn: () => getVenue(id),
		staleTime: 1000 * 60 * 5, 
	});
	
	
	if (isPending) return <div>Loading...</div>;

	if (error) return "An error has occurred: " + error.message;

	
	 return (
    <div className="max-w-2xl mx-auto p-4 m-16">
      {data && (
        <>
          <h1 className="text-3xl font-bold text-dark-blue mb-10">{data.name}</h1>
          
          <div className="mb-4">
            {data.media && data.media.length > 0 ? (
              <ul className="list-none p-0 m-0 flex space-x-4">
                {data.media.map((mediaItem, index) => (
                  <li key={index} className="flex-shrink-0">
                    <img
                      src={mediaItem.split(",")[0]}
                      alt={`${data.name} - Image ${index + 1}`}
                      className="w-full h-64  object-cover mb-2 rounded-md"
                      onError={(e) => {
                        e.target.src = DefaultImage;
                      }}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <img
                src={DefaultImage}
                alt={data.name}
                className=" h-64 mb-2 rounded-md"
              />
            )}
          </div>

		  <div className="mb-4">
            <h3 className="text-lg font-bold">Description:</h3> {data.description}
          </div>

		  <div className="mb-5 bg-light-blue">
			<h3 className="text-lg font-bold mb-3">Location:</h3>
			
			{data.location.address && (
			   <p className="mb-2">Address: {data.location.address}</p>
            )}
			{data.location.city && (
			<p className="mb-2">City: {data.location.city}</p>
			)}
			{data.location.country && (
			<p className="mb-2">Country: {data.location.country}</p>
			)}
			{data.location.continent && (
			<p className="mb-2">Continent: {data.location.continent}</p>
            )}
			{!data.location.address &&
			!data.location.city &&
			!data.location.country &&
			!data.location.continent && (
			<p className="mb-2">
				Contact Holidaze for location info of this venue.{" "}
				<a href="/contact" className="text-blue-500 hover:underline">
					Contact Holidaze</a>
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

          <div className="mb-5 border border-dark-blue m-5">
			<h3 className="text-lg font-bold mb-3">Facilities:</h3>
			<ul className="list-none p-0 m-0">
				<li className={`flex items-center m-3 ${data.meta.wifi ? '' : 'line-through'}`}>
					<FaWifi className="mr-2 text-dark-blue" />Wifi: {data.meta.wifi ? "Yes" : "No"}
				</li>
				<li className={`flex items-center m-3 ${data.meta.parking ? '' : 'line-through'}`}>
                    <FaParking className="mr-2 text-dark-blue" />Parking: {data.meta.parking ? "Yes" : "No"}
                </li>
				<li className={`flex items-center m-3 ${data.meta.breakfast ? '' : 'line-through'}`}>
					<MdFreeBreakfast className="mr-2 text-dark-blue" />Breakfast: {data.meta.breakfast ? "Yes" : "No"}
				</li>
				<li className={`flex items-center m-3 ${data.meta.pets ? '' : 'line-through'}`}>
					<MdPets className="mr-2 text-dark-blue" />Pets: {data.meta.pets ? "Yes" : "No"}
				</li>
            </ul>
          </div>

        </>
      )}
    </div>
  );
}

export default VenueDetail;
