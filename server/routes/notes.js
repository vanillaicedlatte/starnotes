const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const chartData = require('/Users/jamiespann/repos/starnotes/client/src/utils/charts/ChartData.js');


router.post('/', async (req, res) => {
    // Get the user input from the request body
    const { title, content, userTags } = req.body;
  
    // Get the astrology placements from your chart data API
    let chartTags;
    try {
      chartTags = await chartData.calculatePlanetData();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while calculating planet data.' });
      return;
    }
  
    // Create a new note
    const note = new Note({ title, content, userTags, chartTags });
  
    // Save the note
    await note.save();
  
    // Send the note as a response
    res.json(note);
  });
  
  // GET route for /api/notes
router.get('/', async (req, res) => {
    try {
      const notes = await Note.find();
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the notes.' });
    }
  });

  module.exports = router;