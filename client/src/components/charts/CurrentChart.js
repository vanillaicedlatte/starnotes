import React, { useState, useEffect } from 'react';
import WheelChart from './wheelChart.js';

async function fetchData(setPlanetData, setError) {
  try {
    const response = await fetch('http://localhost:3000/api/planetData');
    if (!response.ok) {
      throw new Error(`HTTP errorr! status: ${response.status}`);
    }
    const data = await response.json();
    if (Array.isArray(data) && typeof data[0] === 'object') {
      setPlanetData(data);
    } else {
      throw new Error('getPlanetData did not return an array of objects');
    }
  } catch (error) {
    console.error('Failed to fetch planet data:', error);
    setError(error.message);
  }
}


async function fetchAstroData() {
  try {
    const response = await fetch('http://localhost:3000/api/astroData');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}


function CurrentChart() {
  const [planetData, setPlanetData] = useState([]);
  const [astroData, setAstroData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(setPlanetData, setError);
    fetchAstroData().then(setAstroData);
    const intervalId = setInterval(() => fetchData(setPlanetData, setError), 5 * 60 * 1000); // Fetch data every 5 minutes
    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="current-chart-container">
    <div className="current-chart-wheel">
    {astroData && <WheelChart data={astroData} />}
    </div>
    <div className="current-chart-list">
    <div className="flex flex-col">
      {planetData.map((data) => (
        <span key={data.name}>
          {data.name} at <span className="current-chart-degree">{data.degree}°</span> {data.sign} {data.name === 'Moon' && <span>{data.phase}</span>}
        </span>
      ))}
    </div>
    </div>
    </div>
  );
}

export default CurrentChart;