const fs = require('fs');
const chalk = require('chalk');

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
        console.log(chalk.green.inverse('note added.'));
        saveNote(notes);
    } else {
        console.log(chalk.red.inverse('note title taken!'));
    }
};

const removeNote = title => {
    const notes = loadNotes();
    const newNotes = notes.filter(note => {
        return note.title !== title;
    });
    if (newNotes.length !== notes.length) {
        console.log(chalk.green.inverse('note removed.'));
        saveNote(newNotes);
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }
};

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

module.exports = { getNotes, addNote, removeNote };
