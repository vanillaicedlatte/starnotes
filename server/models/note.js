const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema(
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
		natalChart: {
			type: Schema.Types.ObjectId,
			ref: "NatalChart",
		},
		userId: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Note", noteSchema);
