import React, { useState } from "react";
import axios from "axios";

function NewNatalChart({ cancel }) {
	const [chartName, setChartName] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [birthHour, setBirthHour] = useState("");
	const [birthMinute, setBirthMinute] = useState("");
	const [lat, setLat] = useState(""); // New state variable for the latitude
	const [long, setLong] = useState(""); // New state variable for the longitude
	const [tags, setTags] = useState("");
	const [amPm, setAmPm] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (
			!chartName.trim() ||
			!birthDate.trim() ||
			!birthHour.trim() ||
			!birthMinute.trim() ||
			!lat.trim() ||
			!long.trim()
		) {
			alert("Chart name, birth date, birth time, and location are required");
			return;
		}

		const userTags = tags
			.split(",")
			.map((tag) => tag.trim())
			.filter((tag) => tag !== "");

		let adjustedHour = parseInt(birthHour);
		if (amPm === "PM" && adjustedHour !== 12) {
			adjustedHour += 12;
		} else if (amPm === "AM" && adjustedHour === 12) {
			adjustedHour = 0;
		}

		const birthTime = `${adjustedHour
			.toString()
			.padStart(2, "0")}:${birthMinute.padStart(2, "0")}:00`;

		// Extract the year, month, and day from birthDate
		const [year, month, day] = birthDate.split("-").map(Number);

		// Create a new Date object in UTC
		const birthDateTime = new Date(
			Date.UTC(year, month - 1, day, adjustedHour, Number(birthMinute))
		);

		// Convert the birth date and time to a string in the format "YYYY-MM-DDTHH:mm:ss.sssZ"
		const birthDateTimeString = birthDateTime.toISOString();

		const newSavedChart = {
			userId: "123456789012345678901234",
			chartName,
			birthDate: birthDateTimeString, // Use the combined date and time string
			lat,
			long,
			chartData: {}, // Add this line
			tags: userTags,
		};

		try {
			const response = await axios.post(
				"http://localhost:3000/api/saved-charts",
				newSavedChart
			);
			console.log(response.data);
			// Here you can handle the received natal chart data
			// For example, you can set it to a state variable or display it in the UI
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='bg-base-300 p-4 rounded-box'>
			<h1 className='text-2xl font-bold mb-4'>New Natal Chart</h1>
			<div className='new-natal-chart--input'>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<input
						type='text'
						placeholder='Chart Name'
						value={chartName}
						onChange={(e) => setChartName(e.target.value)}
						className='input input-bordered w-full'
					/>
					<input
						type='date'
						placeholder='Birth Date'
						value={birthDate}
						onChange={(e) => setBirthDate(e.target.value)}
						className='input input-bordered w-full'
					/>
					<div className='flex space-x-4'>
						<input
							type='number'
							placeholder='Birth Hour'
							value={birthHour}
							onChange={(e) => setBirthHour(e.target.value)}
							className='input input-bordered w-full'
							min='1'
							max='12'
						/>
						<input
							type='number'
							placeholder='Birth Minute'
							value={birthMinute}
							onChange={(e) => setBirthMinute(e.target.value)}
							className='input input-bordered w-full'
							min='0'
							max='59'
						/>
						<select
							value={amPm}
							onChange={(e) => setAmPm(e.target.value)}
							className='input input-bordered w-full'
						>
							<option value=''>Select AM/PM</option>
							<option value='AM'>AM</option>
							<option value='PM'>PM</option>
						</select>
					</div>
					<input
						type='text'
						placeholder='Latitude'
						value={lat}
						onChange={(e) => setLat(e.target.value)}
						className='input input-bordered w-full'
					/>
					<input
						type='text'
						placeholder='Longitude'
						value={long}
						onChange={(e) => setLong(e.target.value)}
						className='input input-bordered w-full'
					/>
					<input
						type='text'
						placeholder='Tags'
						value={tags}
						onChange={(e) => setTags(e.target.value)}
						className='input input-bordered w-full'
					/>
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
}

export default NewNatalChart;
