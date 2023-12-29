require('dotenv').config({ path: '../.env' });
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const chartData = require('../client/src/utils/charts/ChartData');
const cors = require('cors');
const notesRouter = require('./routes/notes');  // Adjust the path as needed

app.use(cors());

app.use(express.json()); // for parsing application/json

app.get('/api/planetData', async (req, res) => {
  try {
    const data = await chartData.calculatePlanetData(); // Call the function without arguments
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while calculating planet data.' });
  }
});

app.use('/api/notes', notesRouter);  // Use the notes router

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Database connected successfully'))
.catch(err => console.log(err));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));