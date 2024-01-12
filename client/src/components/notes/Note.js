const Note = ({ note }) => {
  const { title, content, userTags = [], chartTags = [], updatedAt } = note;
  
    return (
      <div className="bg-neutral p-4 text-base-100 rounded-box">
        <h2 className="font-bold">{title}</h2>
        <p>{content}</p>
        <div className="flex gap-1">
          {userTags.map((tag, index) => (
            tag.trim() !== '' && <span className="badge badge-ghost badge-outline text-xs opacity-75 overflow-hidden whitespace-nowrap truncate" key={index}>{tag}</span>
          ))}
        </div>
        <div>
        <p className="text-xs opacity-75">Last edited: {new Date(updatedAt).toLocaleString()}</p> 
        </div>
      </div>
    );
  };

  export default Note;