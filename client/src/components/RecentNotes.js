import React from 'react';
import Note from './Note';
import './RecentNotes.css';

const RecentNotes = () => {
    const recentNotes = [
        { id: 1, title: 'Placeholder Note 1', content: 'This is the content of placeholder note 1.' },
        { id: 2, title: 'Placeholder Note 2', content: 'This is the content of placeholder note 2.' },
        { id: 3, title: 'Placeholder Note 3', content: 'This is the content of placeholder note 3.' },
    ];

    return (
        <div className="recent-notes">
            <h2>Recent Notes</h2>
            <div className="note-wrapper">
            {recentNotes.map((note) => <Note key={note.id} note={note} />)}
            </div>
        </div>
    );
};

export default RecentNotes;