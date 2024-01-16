require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const notesRouter = require("./routes/notes");
const savedChartsRouter = require("./routes/natalcharts");

let chartData;

import("../client/src/utils/charts/chartCalculation/ChartData.cjs").then(
	(module) => {
		chartData = module;
	}
);

app.use(cors());

app.use(express.json()); // for parsing application/json

app.get("/api/planetData", async (req, res) => {
	try {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1; // JavaScript months are 0-indexed
		const day = now.getDate();
		const hour = now.getHours();
		const minute = now.getMinutes();
		const second = now.getSeconds();

		const data = await chartData.calculatePlanetData(
			year,
			month,
			day,
			hour,
			minute,
			second
		);
		res.json(data);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "An error occurred while calculating planet data." });
	}
});

app.get("/api/astroData", async (req, res) => {
	try {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1; // JavaScript months are 0-indexed
		const day = now.getDate();
		const hour = now.getHours();
		const minute = now.getMinutes();
		const second = now.getSeconds();

		const data = await chartData.calculateAstroData(
			year,
			month,
			day,
			hour,
			minute,
			second
		);
		res.json(data);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "An error occurred while calculating AstroChart data." });
	}
});

app.use("/api/notes", notesRouter);
app.use("/api/saved-charts", savedChartsRouter);

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("Database connected successfully"))
	.catch((err) => console.log(err));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
