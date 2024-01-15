const express = require("express");
const router = express.Router();
const SavedChart = require("../models/SavedChart");
const chartData = require("/Users/jamiespann/repos/starnotes/client/src/utils/charts/chartCalculation/ChartData");

router.post("/", async (req, res) => {
	const { userId, chartName, birthDate, lat, long, userTags } = req.body;

	let chartTags;
	try {
		chartTags = await chartData.calculatePlanetData();
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({
				error:
					"An error occurred while calculating planet data for natal chart.",
			});
		return;
	}

	const newSavedChart = new SavedChart({
		userId,
		chartName,
		birthDate,
		lat,
		long,
		chartTags,
		userTags,
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
