const Note = ({ note }) => {
    const { title, content, userTags = [], chartTags = [] } = note;
  
    return (
      <div>
        <h2>{title}</h2>
        <p>{content}</p>
        {userTags.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
        {chartTags.map(({ _id, name, sign, degree }) => (
          <div key={_id}>
            <h3>{name}</h3>
            <p>{sign}</p>
            <p>{degree}</p>
          </div>
        ))}
      </div>
    );
  };

  export default Note;