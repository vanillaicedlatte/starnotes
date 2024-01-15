const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		userTags: [String],
		chartTags: [
			{
				name: String,
				sign: String,
				degree: String,
				house: Number,
			},
		],
		category: {
			type: String,
			enum: ["negative", "neutral", "positive", "uncategorized"],
			default: "uncategorized",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Note", noteSchema);
