import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { filterByCode } from '../reqConfig';

export default function Borders({ borders }) {
  const [neighbors, setNeighbors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (borders.length)
      axios
        .get(filterByCode(borders))
        .then(({ data }) => setNeighbors(data.map((c) => c.name)));
  }, [borders]);

  return (
    <div className="borders">
      <b>Border countries:</b>
      {neighbors.length
        ? neighbors.map((country) => (
            <span onClick={() => navigate(`/country/${country}`)} key={country}>
              {country}{' '}
            </span>
          ))
        : 'none'}
    </div>
  );
}
