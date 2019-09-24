import React, { Component } from "react";
import NoteColors from "../NoteColors/NoteColors";

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      color: "",
      checked: false
    };
    this._hadleColorChange = this.hadleColorChange.bind(this);
  }

  hadleTextChange = e => {
    this.setState({
      text: e.target.value
    });
  };
  hadleColorChange = (e, color) => {
    this.input = e.target;
    this.setState({
      color: color,
      checked: e.target.checked
    });
  };
  handleNoteAdd = () => {
    if (this.state.text.length) {
      let newNote = {
        about: this.state.text,
        color: this.state.color,
        id: new Date()
      };
      this.props.onNoteAdd(newNote);
      this.setState({
        text: "",
        color: "",
        checked: false
      });
      if (this.state.checked) this.input.checked = false;
    }
  };
  render() {
    return (
      <div className="note-editor">
        <textarea
          className="textarea"
          placeholder="Enter your note here..."
          rows={5}
          value={this.state.text}
          onChange={this.hadleTextChange}
        />
        <div className="controls">
          <NoteColors onColorChanged={this._hadleColorChange} />
          <button className="add-button" onClick={this.handleNoteAdd}>
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default NoteEditor;
