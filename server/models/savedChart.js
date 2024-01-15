const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savedChartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    chartName: String,
    birthDate: Date,
    birthTime: String,
    lat: Number,
    long: Number,
    chartData: [{
        name: String,
        sign: String,
        degree: Number,
        house: Number
    }],
    tags: [String],
});

const SavedChart = mongoose.model('SavedChart', savedChartSchema);

module.exports = SavedChart;