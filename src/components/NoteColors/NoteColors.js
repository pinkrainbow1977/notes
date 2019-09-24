import React, { Component } from "react";

class NoteColors extends Component {
  state = {};
  render() {
    let colors = ["grey", "green", "tomato", "yellow", "red", "brown"];
    return (
      <div className="colors-list">
        {colors.map((el, i) => {
          return (
            <div key={i} style={{ backgroundColor: el }}>
              <input
                className="radio-custom"
                id={el}
                type="radio"
                name="color"
                onChange={e => this.props.onColorChanged(e, el)}
              />
              <label className="radio-custom-label" htmlFor={el} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default NoteColors;
