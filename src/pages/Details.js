import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { searchByCountry } from '../reqConfig';

import Borders from '../components/Borders';

import axios from 'axios';
import Spinner from '../components/Spinner';

export default function Details() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fe() {
      try {
        await axios
          .get(searchByCountry(name))
          .then(({ data }) => setCountry(data[0]));
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
    fe();
  }, [name]);

  return (
    <>
      <button onClick={() => navigate(-1)}>back</button>
      {loading && <Spinner />}
      {!loading && Object.keys(country).length === 0 && (
        <h1 style={{ marginTop: '2rem' }}>Something went wrong</h1>
      )}

      {
        Object.keys(country).length > 0 && (
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
                    <b>Sub Region</b> :
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
        )

        // ) : (
        //    <h1 style={{ marginTop: '2rem' }}>Something went wrong</h1>
      }
    </>
  );
}
