import React, { Component } from "react";
import Logo from "./Logo";
import TransactionDateInput from "./TransactionDateInput";
import Select from "./Select";
import axios from "axios";

const API_SAVE_TRANSACTION =
  "http://terimorgan.com/api/contact/divvy-app/saveTransaction.php";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: "",
      date: "",
      cat_id: ""
    };
  }

  handleSubmit = event => {
    axios({
      method: "post",
      url: `${API_SAVE_TRANSACTION}`,
      headers: { "content-type": "application/json" },
      data: this.state
    })
      .then(result => {
        //Do I need to do something with result?
        console.log(result);
        this.clearState();
      })
      .catch(ex => {
        alert("The category cannot be saved.");
        console.warn(ex);
      });
  };

  handleTransactionDate = TransDateInputState => {
    console.log(TransDateInputState);
    this.setState(
      {
        amount: TransDateInputState.amount,
        date: TransDateInputState.date
      },
      () => console.log(this.state)
    );
  };

  handleCatId = selectedCategoryId => {
    console.log(selectedCategoryId);
    this.setState(
      {
        cat_id: selectedCategoryId
      },
      () => console.log(this.state)
    );
  };

  clearState = () => {
    this.setState(
      {
        amount: "",
        date: "",
        cat_id: ""
      },
      () => {
        console.log(this.state);
      }
    );
  };

  render() {
    const { amount, date, cat_id } = this.state;
    return (
      <div className="container">
        <div className="flex-container">
          <Logo />
          <TransactionDateInput
            handleTransactionDate={this.handleTransactionDate}
            amount={amount}
            date={date}
          />
          <Select handleCatId={this.handleCatId} selectedCategoryId={cat_id} />
        </div>
        <button type="submit" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

export default Form;
