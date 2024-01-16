const express = require("express");
const router = express.Router();
const SavedChart = require("../models/SavedChart");
let chartData;

import("../../client/src/utils/charts/chartCalculation/ChartData.cjs").then(
	(module) => {
		chartData = module;
	}
);

router.post("/", async (req, res) => {
	const { userId, chartName, birthDate, lat, long, userTags } = req.body;

	let chartTags;
	const birthDateObj = new Date(birthDate);
	const birthYear = birthDateObj.getFullYear();
	const birthMonth = birthDateObj.getMonth() + 1; // getMonth() returns a zero-based month, so we add 1
	const birthDay = birthDateObj.getDate();
	const birthHour = birthDateObj.getHours();
	const birthMinute = birthDateObj.getMinutes();
	const birthSecond = birthDateObj.getSeconds();
	console.log(birthDate, lat, long);
	try {
		chartTags = await chartData.calculatePlanetData(
			birthYear,
			birthMonth,
			birthDay,
			birthHour,
			birthMinute,
			birthSecond,
			lat,
			long
		);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "An error occurred while calculating planet data for natal chart.",
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
