import React, { useState, useEffect } from "react";
import axios from "axios";

const NewNote = ({ cancel }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [tags, setTags] = useState("");
	const [category, setCategory] = useState(""); // initialize category to an empty string
	const [natalCharts, setNatalCharts] = useState([]);
	const [selectedNatalChart, setSelectedNatalChart] = useState("");
	const [filterText, setFilterText] = useState("");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!title.trim() || !content.trim()) {
			alert("Title and content are required");
			return;
		}

		const userTags = tags
			.split(",")
			.map((tag) => tag.trim())
			.filter((tag) => tag !== "");
		const finalCategory = category || "uncategorized"; // if category is an empty string, set it to 'uncategorized'

		try {
			const response = await axios.post("http://localhost:3000/api/notes", {
				title,
				content,
				userTags,
				category: finalCategory,
				natalChart: selectedNatalChart,
			}); // use finalCategory in the post request
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const fetchNatalCharts = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3000/api/saved-charts"
				);
				setNatalCharts(response.data);
			} catch (error) {
				console.error("Failed to fetch natal charts:", error);
			}
		};

		fetchNatalCharts();
	}, []);

	const filteredCharts = natalCharts.filter((chart) =>
		chart.chartName.toLowerCase().includes(filterText.toLowerCase())
	);

	return (
		<div className='bg-base-300 p-4 rounded-box'>
			<h1 className='text-2xl font-bold mb-4'>New Note</h1>
			<div className='new-note--input'>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<input
						type='text'
						placeholder='Note Title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className='input input-bordered w-full'
					/>
					<textarea
						placeholder='Note Content'
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className='textarea textarea-bordered w-full h-24'
					/>
					<input
						type='text'
						placeholder='Note Tags'
						value={tags}
						onChange={(e) => setTags(e.target.value)}
						className='input input-bordered w-full'
					/>

					<div className='relative'>
						<input
							type='text'
							value={filterText}
							onChange={(e) => {
								setFilterText(e.target.value);
								setIsDropdownOpen(true);
							}}
							onClick={() => setIsDropdownOpen(true)}
							className='input input-bordered w-full'
							placeholder='Select a Natal Chart'
						/>

						{isDropdownOpen && (
							<div className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-auto max-h-32'>
								{filteredCharts.map((chart) => (
									<div
										key={chart._id}
										onClick={() => {
											setSelectedNatalChart(chart._id);
											setFilterText(chart.chartName);
											setIsDropdownOpen(false);
										}}
										className='cursor-pointer p-2 hover:bg-gray-200'
									>
										{chart.chartName}
									</div>
								))}
							</div>
						)}
					</div>

					<select
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className='select select-bordered w-full'
					>
						<option value='' disabled>
							Select a Category
						</option>
						<option value='uncategorized'>Uncategorized</option>
						<option value='positive'>Positive</option>
						<option value='neutral'>Neutral</option>
						<option value='negative'>Negative</option>
					</select>
					<div className='flex justify-between'>
						<button type='submit' className='btn btn-primary'>
							Save
						</button>
						<button onClick={cancel} className='btn btn-ghost'>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NewNote;
