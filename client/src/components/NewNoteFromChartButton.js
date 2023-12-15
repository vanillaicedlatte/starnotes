import React from 'react';

function NewNoteButton({ onClick }) {
  return (
    <div className="new-note-button-container">
    <button onClick={onClick}>
      Create a New Note from this Chart
    </button>
    </div>
  );
}

export default NewNoteButton;