import React, { Component } from "react";

class TransactionInput extends Component {
  handleUserEnterTransaction = event => {
    const amount = event.target.value;

    this.props.handleTransaction(amount);
  };

  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <input
          value={this.props.amount}
          type="text"
          name="transaction"
          placeholder="Enter amount"
          onChange={this.handleUserEnterTransaction}
        />
      </div>
    );
  }
}

export default TransactionInput;
