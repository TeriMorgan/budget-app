import React, { Component } from "react";

class DateInput extends Component {
  handleUserEnterDate = event => {
    const date = event.target.value;

    this.props.handleDate({
      date
    });
  };

  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <input
          value={this.props.date}
          type="date"
          name="date"
          onChange={this.handleUserEnterDate}
          required
        />
      </div>
    );
  }
}

export default DateInput;
