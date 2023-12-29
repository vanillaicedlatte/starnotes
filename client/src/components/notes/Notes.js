import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Note from './Note';  // Adjust the path as needed

const NotesGrid = () => {
    const [notes, setNotes] = useState([]);

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

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {notes.map(note => (
                <Note key={note._id} note={note} />
            ))}
        </div>
    );
};

export default NotesGrid;