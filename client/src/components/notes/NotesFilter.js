import React, { useState } from 'react';

const NotesFilter = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [planet, setPlanet] = useState('');
  const [sign, setSign] = useState('');
  const [degree, setDegree] = useState('');

  const zodiac = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const planets = ['Ascendant', 'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Midheaven', 'North Node', 'South Node'];
  const degrees = Array.from({ length: 30 }, (_, i) => i);

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilter({ searchTerm, planet, sign, degree });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setPlanet('');
    setSign('');
    setDegree('');
    onFilter({ searchTerm: '', planet: '', sign: '', degree: '' });
  };
  
  return (
<form className="flex flex-wrap items-center gap-2" onSubmit={handleSubmit}>
<div className="relative">
  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 fill-current">
    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
  </svg>
  <input className="input input-bordered max-w-xs pl-8" type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search..." />
</div>
  <select className="select select-bordered max-w-xs" value={planet} onChange={e => setPlanet(e.target.value)}>
    <option value="">Select a planet</option>
    {planets.map(planet => (
      <option key={planet} value={planet}>{planet}</option>
    ))}
  </select>
  <select className="select select-bordered max-w-xs" value={sign} onChange={e => setSign(e.target.value)}>
    <option value="">Select a sign</option>
    {zodiac.map(sign => (
      <option key={sign} value={sign}>{sign}</option>
    ))}
  </select>
  <select className="select select-bordered max-w-xs" value={degree} onChange={e => setDegree(e.target.value)}>
    <option value="">Select a degree</option>
    {degrees.map(degree => (
      <option key={degree} value={degree}>{degree}</option>
    ))}
  </select>
  <button className="btn btn-primary" type="submit">Search</button>
  <button className="btn btn-outline" type="button" onClick={clearFilters}>Clear Filters</button>
</form>
  );
};

export default NotesFilter;