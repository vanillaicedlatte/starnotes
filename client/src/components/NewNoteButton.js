import React from 'react';

function NewNoteButton({ onClick }) {
  return (
    <button onClick={onClick}>
      New Note
    </button>
  );
}

export default NewNoteButton;