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
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search..." />
      <select value={planet} onChange={e => setPlanet(e.target.value)}>
        <option value="">Select a planet</option>
        {planets.map(planet => (
          <option key={planet} value={planet}>{planet}</option>
        ))}
      </select>
      <select value={sign} onChange={e => setSign(e.target.value)}>
        <option value="">Select a sign</option>
        {zodiac.map(sign => (
          <option key={sign} value={sign}>{sign}</option>
        ))}
      </select>
      <select value={degree} onChange={e => setDegree(e.target.value)}>
        <option value="">Select a degree</option>
        {degrees.map(degree => (
          <option key={degree} value={degree}>{degree}</option>
        ))}
      </select>
      <button type="submit">Search</button>
      <button type="button" onClick={clearFilters}>Clear Filters</button>
    </form>
  );
};

export default NotesFilter;