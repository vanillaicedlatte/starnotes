import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Note from './Note';
import filterNotes from '../../utils/notes/filterNotes';
import NotesFilter from './NotesFilter';

const NotesGrid = ({ maxNotes }) => {
  const [notes, setNotes] = useState([]);
  const [filters, setFilters] = useState({ searchTerm: '', planet: '', sign: '', degree: '' });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/notes');
        const sortedNotes = response.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setNotes(sortedNotes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, []);

  const handleFilter = (newFilters) => {
    console.log('Selected filters:', newFilters);
    setFilters(newFilters);
  };

  

  let displayedNotes = notes;
  if (maxNotes) {
    displayedNotes = displayedNotes.slice(0, maxNotes);
  }

  return (
    <div>
      <div className="">
      <h2>Search & Filter Notes</h2>
      <NotesFilter onFilter={handleFilter} />
      </div>
      <div className="pt-4">
      <h2>Recent Notes</h2>
      <div className="pb-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        {filterNotes(displayedNotes, filters).map(note => (
          <Note key={note._id} note={note} />
        ))}
      </div>
      <button className="btn btn-secondary">View All Notes</button>
      </div>
    </div>
  );
};

export default NotesGrid;