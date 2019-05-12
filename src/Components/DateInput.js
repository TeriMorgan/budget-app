import React, { Component } from "react";

class DateInput extends Component {
  onUserEnterDate = event => {
    const date = event.target.value;

    this.props.onDate(date);
  };

  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <input
          value={this.props.date}
          type="date"
          name="date"
          placeholder="Enter a date"
          onChange={this.onUserEnterDate}
        />
      </div>
    );
  }
}

export default DateInput;
