import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { searchByCountry } from '../reqConfig';

import Borders from '../components/Borders';

import axios from 'axios';

export default function Details() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState({});

  useEffect(() => {
    axios.get(searchByCountry(name)).then(({ data }) => setCountry(data[0]));
  }, [name]);

  return (
    <>
      <button onClick={() => navigate(-1)}>back</button>
      {Object.keys(country).length ? (
        <div className="details">
          <div className="details-img">
            <img src={country.flag} alt={`flag of ${country.name}`} />
          </div>
          <div className="details-content">
            <h1>{country.name}</h1>
            <div className="details-content-flex">
              <div>
                <p>
                  <b>Native Name</b> : {country.nativeName}
                </p>
                <p>
                  <b>Population</b> : {country.population}
                </p>
                <p>
                  <b>Region</b> : {country.region}
                </p>
                <p>
                  <b>Sub Region</b> :{' '}
                  {country.subRegion ? country.subRegion : 'none'}
                </p>
                <p>
                  <b>Capital</b> : {country.capital}
                </p>
              </div>
              <div>
                <p>
                  <b>Top Level Domain</b> :
                  {country.topLevelDomain.map((obj) => (
                    <span key={obj}>{obj} </span>
                  ))}
                </p>
                <p>
                  <b>Currencies</b> :
                  {country.currencies.map((obj) => (
                    <span key={obj.code}> {obj.name} </span>
                  ))}
                </p>
                <p>
                  <b>Languages</b> :
                  {country.languages.map((obj) => (
                    <span key={obj.name}> {obj.name} </span>
                  ))}
                </p>
              </div>
            </div>
            <Borders borders={country.borders ? [country.borders] : []} />
          </div>
        </div>
      ) : (
        <h1>An error occurred</h1>
      )}
    </>
  );
}
