import React, { Component } from "react";

class CurrencyInput extends Component {
  onChange = event => {
    const amount = event.target.value.replace(/[^0-9\.]/g, "");
    this.props.onChangeAmount(amount);
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
          onChange={this.onChange}
          onMouseLeave={onMouseLeaveSanitizeAmount}
        />
      </div>
    );
  }
}

export default CurrencyInput;
