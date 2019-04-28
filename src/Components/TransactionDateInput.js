import React, { Component } from "react";

class TransactionDateInput extends Component {
  handleUserEnterTransaction = event => {
    const amount = event.target.value;

    this.props.handleTransactionDate({
      amount,
      date: this.props.date
    });
  };

  handleUserEnterDate = event => {
    const date = event.target.value;

    this.props.handleTransactionDate({
      date,
      amount: this.props.amount
    });
  };

  render() {
    return (
      <div className="sub-container">
        <label>Transaction:</label>
        <input
          value={this.props.amount}
          type="text"
          name="transaction"
          placeholder="Enter transaction"
          onChange={this.handleUserEnterTransaction}
          required
        />
        <label>Date:</label>
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

export default TransactionDateInput;
