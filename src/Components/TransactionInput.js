import React, { Component } from "react";

class TransactionInput extends Component {
  handleUserEnterTransaction = event => {
    const amount = event.target.value;

    this.props.handleTransaction({
      amount
    });
  };

  render() {
    return (
      <div>
        <label>Transaction:</label>
        <input
          value={this.props.amount}
          type="text"
          name="transaction"
          placeholder="Enter transaction"
          onChange={this.handleUserEnterTransaction}
          required
        />
      </div>
    );
  }
}

export default TransactionInput;
