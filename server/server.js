require('dotenv').config({ path: '../.env' });
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Note = require('./models/note');
const noteRoutes = require('./noteRoutes');
const chartData = require('../client/src/utils/ChartData');
const cors = require('cors');

app.use(cors());

app.get('/api/planetData', async (req, res) => {
  try {
    const data = await chartData.calculatePlanetData(); // Call the function without arguments
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while calculating planet data.' });
  }
});

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Database connected successfully'))
.catch(err => console.log(err));

app.use(express.json());
app.use('/notes', noteRoutes);

app.post('/notes', async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.json(note);
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});