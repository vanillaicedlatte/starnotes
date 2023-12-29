import React, { useState } from "react";
import axios from 'axios';
import "./NewNote.css";

const NewNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userTags = tags.split(',').map(tag => tag.trim());

    try {
      const response = await axios.post('http://localhost:3000/api/notes', { title, content, userTags });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="new-note--container">
      <h1>New Note</h1>
      <div className="new-note--input">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Note Title" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea placeholder="Note Content" value={content} onChange={e => setContent(e.target.value)} />
          <input type="text" placeholder="Note Tags" value={tags} onChange={e => setTags(e.target.value)} />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default NewNote;