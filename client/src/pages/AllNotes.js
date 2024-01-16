import React from "react";
import NotesGrid from "../components/notes/NotesGrid";

const AllNotes = () => {
	return (
		<div>
			<h1>All Notes</h1>
			<NotesGrid showPagination />
		</div>
	);
};

export default AllNotes;
