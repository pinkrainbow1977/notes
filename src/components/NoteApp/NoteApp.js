import React, { Component } from "react";
import "@reshuffle/code-transform/macro";

import {
  addNotesToBackend,
  getNotes,
  removeNote
} from "../../../backend/notes";

import NoteEditor from "../NoteEditor/NoteEditor";
import NoteGrid from "../NoteGrid/NoteGrid";

class NoteApp extends Component {
  state = {
    notes: []
  };
  componentDidMount = async () => {
    getNotes().then(notes => {
      if (notes) {
        this.setState({
          notes: [...notes]
        });
      }
    });
  };

  handleDeleteNote = note => {
    let noteId = note.id;
    removeNote(note.id).then(res => console.log(res));
    let newNotes = this.state.notes.filter(function(note) {
      return note.id != noteId;
    });
    this.setState({
      notes: newNotes
    });
  };
  handleNoteAdd = async newNote => {
    this.setState(
      {
        notes: [newNote, ...this.state.notes]
      },
      () => addNotesToBackend(newNote)
    );
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div className="notes-app">
          <h2 className="app-header">Notes App</h2>
          <NoteEditor onNoteAdd={this.handleNoteAdd} />
          <NoteGrid
            notes={this.state.notes}
            onNoteDelete={this.handleDeleteNote}
          />
        </div>
      </div>
    );
  }
}

export default NoteApp;
