import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Note from './Note';
import filterNotes from '../../utils/notes/filterNotes';
import NotesFilter from './NotesFilter';

const NotesGrid = () => {
  const [notes, setNotes] = useState([]);
  const [filters, setFilters] = useState({ searchTerm: '', planet: '', sign: '', degree: '' });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/notes');
        setNotes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, []);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <NotesFilter onFilter={handleFilter} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        {filterNotes(notes, filters).map(note => (
          <Note key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default NotesGrid;