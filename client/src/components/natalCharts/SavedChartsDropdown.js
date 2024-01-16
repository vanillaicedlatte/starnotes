import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to install this package if you haven't already

const SavedChartsDropdown = () => {
	const [savedCharts, setSavedCharts] = useState([]);

	useEffect(() => {
		const fetchSavedCharts = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3000/api/saved-charts"
				); // Replace with your actual API endpoint
				setSavedCharts(response.data);
			} catch (error) {
				console.error("Failed to fetch saved charts:", error);
			}
		};

		fetchSavedCharts();
	}, []);

	return (
		<select
			defaultValue='Saved Charts'
			className='form-select select select-bordered w-full'
		>
			<option disabled>Saved Charts</option>
			{savedCharts.map((chart) => (
				<option key={chart._id} value={chart._id}>
					{chart.chartName}
				</option>
			))}
		</select>
	);
};

export default SavedChartsDropdown;
