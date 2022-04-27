import React from 'react';

import Country from './Country';

export default function AllCountries({ countries }) {
  return (
    <div className="allCountriesList">
      <Country countries={countries} />
    </div>
  );
}
