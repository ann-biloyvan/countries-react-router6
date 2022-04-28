import React from 'react';

import { useNavigate } from 'react-router-dom';

export default function Country({ countries }) {
  const navigate = useNavigate();

  return (
    <>
      {countries.map((country) => (
        <div
          className="countryCard"
          key={country.name}
          onClick={() => navigate(`country/${country.name.toLowerCase()}`)}
        >
          <div>
            <img src={country.flags.png} alt={`flag of ${country.name}`} />
          </div>
          <div className="countryCard-content">
            <h2>{country.name}</h2>
            <p>
              <b>Population</b>: {country.population}
            </p>
            <p>
              <b>Region</b>: {country.region}
            </p>
            <p>
              <b>Capital</b>: {country.capital}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
