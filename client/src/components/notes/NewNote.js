import React, { useState } from "react";
import axios from 'axios';

const NewNote = ({ cancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Title and content are required');
      return;
    }

    const userTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    try {
      const response = await axios.post('http://localhost:3000/api/notes', { title, content, userTags });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-base-300 p-4 rounded-box">
      <h1 className="text-2xl font-bold mb-4">New Note</h1>
      <div className="new-note--input">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Note Title" value={title} onChange={e => setTitle(e.target.value)} className="input input-bordered w-full" />
          <textarea placeholder="Note Content" value={content} onChange={e => setContent(e.target.value)} className="textarea textarea-bordered w-full h-24" />
          <input type="text" placeholder="Note Tags" value={tags} onChange={e => setTags(e.target.value)} className="input input-bordered w-full" />
          <div className="flex justify-between">
            <button type="submit" className="btn btn-primary">Save</button>
            <button onClick={cancel} className="btn btn-ghost">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewNote;