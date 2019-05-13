import React, { Component } from "react";

class DateInput extends Component {
  onChangeDate = event => {
    const date = event.target.value;

    this.props.onChangeDate(date);
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
          onChange={this.onChangeDate}
        />
      </div>
    );
  }
}

export default DateInput;
