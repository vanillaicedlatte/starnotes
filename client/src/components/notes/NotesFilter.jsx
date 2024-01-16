import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import filterNotes from "../../utils/notes/filterNotes.cjs";

const NotesFilter = ({ onFilter }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [planet, setPlanet] = useState("");
	const [sign, setSign] = useState("");
	const [degree, setDegree] = useState("");
	const [category, setCategory] = useState(""); // new state variable for category
	const [moonPhase, setMoonPhase] = useState("");
	const [savedCharts, setSavedCharts] = useState([]);

	const zodiac = [
		"Aries",
		"Taurus",
		"Gemini",
		"Cancer",
		"Leo",
		"Virgo",
		"Libra",
		"Scorpio",
		"Sagittarius",
		"Capricorn",
		"Aquarius",
		"Pisces",
	];
	const planets = [
		"Ascendant",
		"Sun",
		"Moon",
		"Mercury",
		"Venus",
		"Mars",
		"Jupiter",
		"Saturn",
		"Uranus",
		"Neptune",
		"Pluto",
		"Midheaven",
		"North Node",
		"South Node",
	];
	const degrees = Array.from({ length: 30 }, (_, i) => i);
	const categories = ["uncategorized", "positive", "neutral", "negative"]; // new array for category options

	const handleSubmit = async (event) => {
		event.preventDefault();
		const filters = { searchTerm, planet, sign, degree, category }; // include category in the filters
		const notes = await filterNotes(filters);
		// Do something with the filtered notes...
	};

	const clearFilters = () => {
		setSearchTerm("");
		setPlanet("");
		setSign("");
		setDegree("");
		setCategory(""); // reset category filter
		onFilter({
			searchTerm: "",
			planet: "",
			sign: "",
			degree: "",
			category: "",
		}); // include category in the filters
	};

	return (
		<form className='flex flex-wrap items-center gap-2' onSubmit={handleSubmit}>
			<div className='relative'>
				<FontAwesomeIcon
					icon={faSearch}
					className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
				/>
				<input
					className='input input-bordered max-w-xs pl-8'
					type='text'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder='Search...'
				/>
			</div>
			<select
				className='select select-bordered max-w-xs'
				value={planet}
				onChange={(e) => setPlanet(e.target.value)}
			>
				<option value=''>Planet/Object</option>
				{planets.map((planet) => (
					<option key={planet} value={planet}>
						{planet}
					</option>
				))}
			</select>
			<select
				className='select select-bordered max-w-xs'
				value={moonPhase}
				onChange={(e) => setMoonPhase(e.target.value)}
			>
				<option value=''>Moon Phase</option>
				<option key='Full Moon' value='Full Moon'>
					Full Moon
				</option>
			</select>
			<select
				className='select select-bordered max-w-xs'
				value={sign}
				onChange={(e) => setSign(e.target.value)}
			>
				<option value=''>Sign</option>
				{zodiac.map((sign) => (
					<option key={sign} value={sign}>
						{sign}
					</option>
				))}
			</select>
			<select
				className='select select-bordered max-w-xs'
				value={degree}
				onChange={(e) => setDegree(e.target.value)}
			>
				<option value=''>Degree</option>
				{degrees.map((degree) => (
					<option key={degree} value={degree}>
						{degree}
					</option>
				))}
			</select>
			<select
				className='select select-bordered max-w-xs'
				value={category}
				onChange={(e) => setCategory(e.target.value)}
			>
				{" "}
				{/* new select field for category */}
				<option value=''>Category</option>
				{categories.map((category) => (
					<option key={category} value={category}>
						{category}
					</option>
				))}
			</select>
			<button className='btn btn-primary' type='submit'>
				Filter
			</button>
			{(searchTerm || planet || sign || degree || category) && (
				<button
					className='btn btn-outline'
					type='button'
					onClick={clearFilters}
				>
					<FontAwesomeIcon icon={faTimes} /> Clear
				</button>
			)}
		</form>
	);
};

export default NotesFilter;
