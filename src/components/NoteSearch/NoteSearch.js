import React, { Component } from "react";

class NoteSearch extends Component {
  state = {};
  render() {
    return (
      <input
        className="noteSearch"
        type="search"
        placeholder="Search..."
        onChange={this.props.onSearch}
      />
    );
  }
}

export default NoteSearch;
