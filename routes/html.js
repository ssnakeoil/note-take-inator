const path = require('path');
const express = require('express').Router();

express.get('/notes', (req, res) => { // Get all notes from the db.json file
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

express.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = express;