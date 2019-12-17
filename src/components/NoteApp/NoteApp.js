import '@reshuffle/code-transform/macro';
import React, { Component } from 'react';
import { AuthContext } from '@reshuffle/react-auth';
import {
  addNotesToBackend,
  getNotes,
  removeNote,
} from '../../../backend/notes';
import Nav from '../NavBar/Nav';
import NoteEditor from '../NoteEditor/NoteEditor';
import NoteGrid from '../NoteGrid/NoteGrid';

class NoteApp extends Component {
  static contextType = AuthContext;
  state = {
    notes: [],
  };

  componentDidMount = async () => {
    getNotes().then(notes => {
      if (notes) {
        this.setState({
          notes: [...notes],
        });
      }
    });
  };

  handleDeleteNote = note => {
    let noteId = note.id;
    removeNote(note.id).then(res => console.log(res));
    let newNotes = this.state.notes.filter(function(note) {
      return note.id !== noteId;
    });
    this.setState({
      notes: newNotes,
    });
  };

  handleNoteAdd = async newNote => {
    this.setState(
      {
        notes: [newNote, ...this.state.notes],
      },
      () => addNotesToBackend(newNote),
    );
  };

  render() {
    const { loading, error, authenticated } = this.context;

    if (loading) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    }

    if (error) {
      return (
        <div>
          <h1>{error.toString()}</h1>
        </div>
      );
    }
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className='notes-app'>
          <Nav />
          {authenticated ? (
            <div>
              <NoteEditor onNoteAdd={this.handleNoteAdd} />
              <NoteGrid
                notes={this.state.notes}
                onNoteDelete={this.handleDeleteNote}
              />
            </div>
          ) : (
            <div className='login-state'>
              <h1 style={{ textAlign: 'center' }}>
                Please login to add to your notes app
              </h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default NoteApp;
