const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
let chartData;

import("../../client/src/utils/charts/chartCalculation/ChartData.cjs").then(
	(module) => {
		chartData = module;
	}
);

router.post("/", async (req, res) => {
	// Get the user input from the request body
	const { title, content, userTags, category, natalChart } = req.body;
	console.log("Got the user input from the request body");

	// Get the astrology placements from your chart data API
	let chartTags;
	try {
		chartTags = await chartData.calculatePlanetData();
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "An error occurred while calculating planet data for note.",
		});
		return;
	}

	// Create a new note
	const note = new Note({
		title,
		content,
		userTags,
		chartTags,
		category,
		natalChart,
	});

	// Save the note
	await note.save();

	// Send the note as a response
	res.json(note);
});

// GET route for /api/notes
router.get("/", async (req, res) => {
	try {
		const notes = await Note.find();
		res.json(notes);
	} catch (error) {
		res
			.status(500)
			.json({ error: "An error occurred while fetching the notes." });
	}
});

module.exports = router;
