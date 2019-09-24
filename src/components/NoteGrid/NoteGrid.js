import React, { Component } from "react";
import Masonry from "masonry-layout";

import Note from "../Note/Note";
import NoteSearch from "../NoteSearch/NoteSearch";

class NoteGrid extends Component {
  state = {
    value: ""
  };
  componentDidMount = () => {
    this.msnry = new Masonry(this.grid, {
      itemSelector: ".note",
      columnWidth: 200,
      gutter: 10
    });
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.notes.length != prevProps.notes.length ||
      this.state.value.length != prevState.value.length
    ) {
      this.msnry.reloadItems();
      this.msnry.layout();
    }
  };
  handleSearch = e => {
    this.setState({
      value: e.target.value
    });
  };
  render() {
    let searchQuery = this.state.value.toLowerCase();
    let displayedNotes = !this.state.value
      ? this.props.notes
      : this.props.notes.filter(function(item) {
          let searchValue = item.about.toLowerCase();
          return searchValue.indexOf(searchQuery) !== -1;
        });
    return (
      <div>
        <NoteSearch onSearch={this.handleSearch} />
        <div ref={div => (this.grid = div)} className="notes-grid">
          {displayedNotes.map(note => {
            return (
              <Note
                key={note.id}
                color={note.color}
                onDelete={this.props.onNoteDelete.bind(null, note)}
              >
                {note.about}
              </Note>
            );
          })}
        </div>
      </div>
    );
  }
}

export default NoteGrid;
