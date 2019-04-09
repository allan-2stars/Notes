//const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

// Customize yargs version
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true, // force this option as required
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
});

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler() {
        console.log('Remove a note!');
    }
});

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler() {
        console.log('Listing out all notes!');
    }
});

// Reading command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler() {
        console.log('Reading a note!');
    }
});

yargs.parse();
