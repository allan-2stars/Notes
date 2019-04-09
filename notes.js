const fs = require('fs');

const getNotes = () => {};

const addNote = (title, body) => {
    const notes = loadNotes();
    // no add note if the note title exists
    const duplicateNotes = notes.filter(note => {
        return note.title === title;
    });
    if (duplicateNotes.length === 0) {
        notes.push({
            title,
            body
        });
        saveNote(notes);
    } else {
        console.log('note exist with that title');
    }
};

const removeNote = title => {};

const saveNote = notes => {
    const dataJSON = JSON.stringify(notes);
    // write file with JSON format
    fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (err) {
        // if read File failed, just use an empty array as the content
        return [];
    }
};

module.exports = { getNotes, addNote };
