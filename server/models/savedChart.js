const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savedChartSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User" },
		chartName: String,
		birthDate: Date,
		lat: Number,
		long: Number,
		chartTags: [
			{
				name: String,
				sign: String,
				degree: Number,
				house: Number,
			},
		],
		userTags: [String],
	},
	{ timestamps: true }
);

const SavedChart = mongoose.model("SavedChart", savedChartSchema);

module.exports = SavedChart;
