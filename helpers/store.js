const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }
  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }
  getNotes() { // Get all notes from the db.json file
    return this.read().then((notes) => { // Read the db.json file
      let parseNotes;

      try { // Parse the JSON string to an object
        parseNotes = [].concat(JSON.parse(notes));
      } catch (err) { // If there was an error, return an empty array
        parseNotes = [];
      }
      return parseNotes;
    });
  }

  addNote(note) { // Add a note to the db.json file
    const { title, text } = note;

    if (!title || !text) {// If the title or text are blank, throw an error
      throw new Error("Note 'title' and 'text' cannot be blank");
    }
    const newNote = { title, text, id: uuidv1() }; // Create a new note object, add a unique id to it
    return this.getNotes() 
      .then((notes) => [...notes, newNote]) // Add the new note to the array of notes
      .then((updatedNotes) => this.write(updatedNotes)) // Write the updated notes to the db.json file
      .then(() => newNote); // Return the newNote object
  }

  removeNote(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id)) // Filter out the note with the given id
      .then((filteredNotes) => this.write(filteredNotes)); // Write the filtered notes to the db.json file
  }
}

module.exports = new Store();
