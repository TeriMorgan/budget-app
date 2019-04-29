import React, { Component } from "react";
import DateInput from "./DateInput";
import TransactionInput from "./TransactionInput";

class SortingForm extends Component {
  render() {
    return (
      <div>
        <DateInput />
        <DateInput />
        <TransactionInput />
        <TransactionInput />
      </div>
    );
  }
}

export default SortingForm;
