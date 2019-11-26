import React, { Component } from 'react';
import '@reshuffle/code-transform/macro';
import { AuthContext } from '@reshuffle/react-auth';
import {
  addNotesToBackend,
  getNotes,
  removeNote,
} from '../../../backend/notes';

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
    const {
      loading,
      error,
      authenticated,
      profile,
      getLoginURL,
      getLogoutURL,
    } = this.context;

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
          <nav className='nav-bar'>
            <h2 className='app-header'>Notes App</h2>
            <div>
              {authenticated ? (
                <>
                  <img
                    alt={profile.displayName}
                    src={profile.picture}
                    height={20}
                  />
                  <span>{profile.displayName}</span>
                  <a className='nav-btns' href={getLogoutURL()}>
                    Logout
                  </a>
                </>
              ) : (
                <a className='nav-btns' href={getLoginURL()}>
                  Login
                </a>
              )}
            </div>
          </nav>
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
