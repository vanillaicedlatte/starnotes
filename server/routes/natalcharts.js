const express = require("express");
const router = express.Router();
const SavedChart = require("../models/SavedChart");
const chartData = require("/Users/jamiespann/repos/starnotes/client/src/utils/charts/chartCalculation/ChartData");

router.post("/", async (req, res) => {
	const { userId, chartName, birthDate, birthTime, lat, long, tags } = req.body;

	// let chartPlacements;
	// try {
	//     chartPlacements = await chartData.calculatePlanetData(
	//         birthDate,
	//         birthTime,
	//         lat,
	//         long
	//     );
	// } catch (error) {
	//     console.error(error);
	//     res
	//         .status(500)
	//         .json({ error: "An error occurred while calculating chart placements." });
	//     return;
	// }

	const newSavedChart = new SavedChart({
		userId,
		chartName,
		birthDate,
		birthTime,
		lat,
		long,
		chartData, // Provide a default value for chartData
		tags,
	});

	try {
		await newSavedChart.save();
		res.status(201).json(newSavedChart);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.get("/", async (req, res) => {
	try {
		const savedCharts = await SavedChart.find();
		res.json(savedCharts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
