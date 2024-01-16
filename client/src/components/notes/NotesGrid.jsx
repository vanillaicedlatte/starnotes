import React, { useEffect, useState } from "react";
import axios from "axios";
import Note from "./Note";
import filterNotes from "../../utils/notes/filterNotes.cjs";
import NotesFilter from "./NotesFilter";

const NotesGrid = ({ maxNotes, showPagination }) => {
	const [notes, setNotes] = useState([]);
	const [filters, setFilters] = useState({
		searchTerm: "",
		planet: "",
		sign: "",
		degree: "",
	});
	const [page, setPage] = useState(1);
	const notesPerPage = 9; // or any number you want

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				const response = await axios.get("http://localhost:3000/api/notes");
				const sortedNotes = response.data.sort(
					(a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
				);
				setNotes(sortedNotes);
			} catch (error) {
				console.error(error);
			}
		};

		fetchNotes();
	}, []);

	const handleFilter = (newFilters) => {
		console.log("Selected filters:", newFilters);
		setFilters(newFilters);
	};

	let displayedNotes = notes;
	if (maxNotes) {
		displayedNotes = displayedNotes.slice(0, maxNotes);
	}

	// Pagination
	const indexOfLastNote = page * notesPerPage;
	const indexOfFirstNote = indexOfLastNote - notesPerPage;
	const currentNotes = filterNotes(displayedNotes, filters).slice(
		indexOfFirstNote,
		indexOfLastNote
	);

	const paginate = (pageNumber) => setPage(pageNumber);

	return (
		<div>
			<div className=''>
				<h2>Search & Filter Notes</h2>
				<NotesFilter onFilter={handleFilter} />
			</div>
			<div className='pt-4'>
				<h2>Recent Notes</h2>
				<div
					className='pb-4'
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
						gap: "1rem",
					}}
				>
					{currentNotes.map((note) => (
						<Note key={note._id} note={note} />
					))}
				</div>
				{showPagination && (
					<div className='pagination flex justify-center my-4 join'>
						{[
							...Array(Math.ceil(displayedNotes.length / notesPerPage)).keys(),
						].map((number) => (
							<button
								key={number + 1}
								onClick={() => paginate(number + 1)}
								className={`btn join-item ${
									page === number + 1 ? "btn-active" : "btn-ghost"
								}`}
							>
								{number + 1}
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default NotesGrid;
