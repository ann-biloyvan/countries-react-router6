import React from 'react';

export default function Filter({ options, onChange }) {
  return (
    <>
      <select name="select" onChange={onChange}>
        <option defaultValue={'sort by region'}>sort by region</option>
        {options.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </>
  );
}
