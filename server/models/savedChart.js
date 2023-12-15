const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savedChartSchema = new Schema({
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        chartName: String,
        chartData: {
            // Define your chart data structure here
        },
        tags: [String],
});

const SavedChart = mongoose.model('SavedChart', savedChartSchema);

module.exports = SavedChart;