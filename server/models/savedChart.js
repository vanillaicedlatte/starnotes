const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savedChartSchema = new Schema({
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        chartName: String,
        chartData: {
            sun: { sign: String, degree: Number, house: Number },
            moon: { sign: String, degree: Number, house: Number },
            mercury: { sign: String, degree: Number, house: Number },
            venus: { sign: String, degree: Number, house: Number },
            mars: { sign: String, degree: Number, house: Number },
            jupiter: { sign: String, degree: Number, house: Number },
            saturn: { sign: String, degree: Number, house: Number },
            uranus: { sign: String, degree: Number, house: Number },
            neptune: { sign: String, degree: Number, house: Number },
            pluto: { sign: String, degree: Number, house: Number },
            northNode: { sign: String, degree: Number, house: Number },
            southNode: { sign: String, degree: Number, house: Number },
            midheaven: { sign: String, degree: Number, house: Number },
            ascendant: { sign: String, degree: Number, house: Number },
            descendant: { sign: String, degree: Number, house: Number }
        },
        tags: [String],
});

const SavedChart = mongoose.model('SavedChart', savedChartSchema);

module.exports = SavedChart;