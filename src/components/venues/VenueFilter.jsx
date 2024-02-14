import React, { useState, useEffect } from 'react';
import { Input } from 'react-daisyui';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { ALLVENUES_URL } from '../../constant/api';


function VenueFilter() {
  const { data: venues, isLoading, error } = useFetch(ALLVENUES_URL, {}, [], 1000 * 60 * 5);

  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filterVenues = venues?.filter((venue) =>
    venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.location.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.location.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const closeResultsOnOutsideClick = (event) => {
      const input = document.getElementById('searchInput');
      const resultsContainer = document.getElementById('resultsContainer');

      if (input && !input.contains(event.target) && resultsContainer && !resultsContainer.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.body.addEventListener('click', closeResultsOnOutsideClick);

    return () => {
      document.body.removeEventListener('click', closeResultsOnOutsideClick);
    };
  }, [setShowResults]);

  return (
    <div className="relative mx-auto p-5 bg-blue rounded-lg ml-5 mr-5 sm:ml-12 sm:mr-12">
      <div className="flex justify-center">
        <Input
          id="searchInput"
          className="text-center bg-white rounded-lg border-none z-40"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value.trim());
            setShowResults(!!event.target.value.trim());
          }}
          placeholder="Search in venues"
        />
      </div>
      {filterVenues?.length > 0 && searchTerm.length > 0 && showResults && (
        <ul
          id="resultsContainer"
          className="left-5 right-5 bg-blue"
        >
          {filterVenues.map((venue) => (
            <li key={venue.id}>
              <Link to={`/venuesspecific/${venue.id}`} className="block p-4 hover:bg-gray-600 mb-16">
                <div className="text-white">
                  <div className="font-bold">{venue.name}</div>
                  <div>{venue.location.country}</div>
                  <div>{venue.location.city}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default VenueFilter;




