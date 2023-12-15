import React from 'react';
import './Note.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const Note = ({ note }) => (
  <div className="note-card">
    <h3>{note.title}</h3>
    <p>{note.content}</p>
    <div className="note-card-footer">
      <small>{note.date}</small>
      <div className="icons">
        <FontAwesomeIcon icon={faEdit} />
        <FontAwesomeIcon icon={faTrash} />
      </div>
      </div>
  </div>
);

export default Note;