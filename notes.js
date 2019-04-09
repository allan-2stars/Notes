const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {};

const addNote = (title, body) => {
    const notes = loadNotes();
    // no add note if the note title exists
    const duplicateNote = notes.find(note => {
        return note.title === title;
    });
    if (!duplicateNote) {
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

const listNotes = () => {
    // just list the title
    const notes = loadNotes();
    console.log(chalk.inverse('Your Notes:'));
    notes.map(note => {
        console.log(chalk.blue(note.title));
    });
};

const readNote = title => {
    const notes = loadNotes();
    const note = notes.find(note => {
        return note.title === title;
    });
    if (!note) {
        console.log(chalk.red.inverse('note not found!'));
    } else {
        console.log(chalk.blue(note.title));
        console.log(note.body);
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

module.exports = { getNotes, addNote, removeNote, listNotes, readNote };
