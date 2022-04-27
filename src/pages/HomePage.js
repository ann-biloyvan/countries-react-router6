import React, { useEffect, useState } from 'react';

import axios from 'axios';

import AllCountries from '../components/AllCountries';
import Search from '../components/Search';
import Filter from '../components/Filter';
import { ALL_COUNTRIES } from '../reqConfig';

export default function HomePage() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [option, setOption] = useState('');

  useEffect(() => {
    axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
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

      {!filteredCountries.length ? (
        <h1>No countries found</h1>
      ) : (
        <AllCountries countries={filteredCountries} />
      )}
    </>
  );
}
