const express = require('express').Router();
const store = require('../helpers/store');

express.get('/notes', (req, res) => { // Get all notes from the db.json file
  store
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

express.post('/notes', (req, res) => { // Add a note to the db.json file
  store
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

express.delete('/notes/:id', (req, res) => { // Delete a note from the db.json file by id
  store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = express; // Export the express.Router() object
