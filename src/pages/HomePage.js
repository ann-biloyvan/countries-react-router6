import React, { useEffect, useState } from 'react';

import axios from 'axios';

import AllCountries from '../components/AllCountries';
import Search from '../components/Search';
import Filter from '../components/Filter';
import { ALL_COUNTRIES } from '../reqConfig';
import Spinner from '../components/Spinner';

export default function HomePage() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [option, setOption] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fe() {
      try {
        await axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
    fe();
  }, []);

  const regions = [...new Set(countries.map((country) => country.region))];

  useEffect(() => {
    let result = [...countries];
    if (query) {
      result = result.filter((country) =>
        country.name.toLowerCase().includes(query.toLowerCase().trim())
      );
    }
    if (option && option !== 'sort by region') {
      result = result.filter((country) => country.region.includes(option));
    }
    setFilteredCountries(result);
  }, [query, countries, option]);

  return (
    <>
      <div className="controllers">
        <Search onChange={(e) => setQuery(e.target.value)} />
        <Filter onChange={(e) => setOption(e.target.value)} options={regions} />
      </div>

      {filteredCountries.length ? (
        <AllCountries countries={filteredCountries} />
      ) : (
        loading && <Spinner />
      )}
      {!filteredCountries.length && !loading && (
        <h1 style={{ marginTop: '2rem' }}>No matches found</h1>
      )}
    </>
  );
}
