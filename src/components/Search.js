import React from 'react';

export default function Search({ onChange }) {
  return (
    <>
      <input
        className="search"
        type="search"
        placeholder="Search for a country"
        onChange={onChange}
      />
    </>
  );
}
