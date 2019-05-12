import React, { Component } from "react";

class TransactionInput extends Component {
  onUserEnterTransaction = event => {
    const amount = event.target.value.replace(/[^0-9\.]/g, "");
    this.props.onTransaction(amount);
  };

  render() {
    const { label, amount, onMouseLeaveSanitizeAmount } = this.props;
    return (
      <div>
        <label>{label}</label>
        <input
          value={amount}
          type="text"
          name="transaction"
          placeholder="Enter amount"
          onChange={this.onUserEnterTransaction}
          onMouseLeave={onMouseLeaveSanitizeAmount}
        />
      </div>
    );
  }
}

export default TransactionInput;
