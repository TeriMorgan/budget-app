import React, { Component } from "react";
import axios from "axios";
import Logo from "./Logo";
import TransactionInput from "./TransactionInput";
import CreateCategory from "./CreateCategory";
import DateInput from "./DateInput";
import SelectReact from "./SelectReact";

// const HOST = 'http://localhost';
const HOST = "http://terimorgan.com";

const API_SAVE_TRANSACTION =
  HOST + "/api/contact/divvy-app/saveTransaction.php";

class CreateTransaction extends Component {
  initialState = {
    amount: "",
    date: "",
    category: null
  };

  constructor(props) {
    super(props);

    this.state = this.initialState;
  }

  onClickSaveTransaction = event => {
    if (this.state.amount === "" || this.state.date === "") {
      alert("Please enter a transaction amount and date.");
    } else {
      this.saveTransactionInDatabase();
    }
  };

  saveTransactionInDatabase = () => {
    const formValues = {
      amount: this.state.amount,
      date: this.state.date,
      cat_id: this.state.category !== null ? this.state.category.value : null
    };

    axios({
      method: "post",
      url: `${API_SAVE_TRANSACTION}`,
      headers: { "content-type": "application/json" },
      data: formValues
    })
      .then(result => {
        this.props.loadRecentTransactions();
        this.clearState();
      })
      .catch(ex => {
        alert("The transaction cannot be saved.");
        console.warn(ex);
      });
  };

  onTransaction = amount => {
    this.setState({
      amount
    });
  };

  onMouseLeaveSanitizeAmount = () => {
    const { amount } = this.state;
    const extraPeriods = amount.match(/\./g);
    const period = amount.indexOf(".");
    if (extraPeriods && extraPeriods.length > 1) {
      alert("Only one period is allowed in the transaction field.");
    } else if (amount.slice(0, period).length > 6) {
      alert("Please limit transactions to under $1,000,000.");
    } else if (
      period !== -1 &&
      amount.slice(period + 1, amount.length).length > 2
    ) {
      alert("Only two digits are allowed past the decimal point.");
    } else {
      this.setState({
        amount
      });
    }
  };

  onDate = date => {
    this.setState({
      date
    });
  };

  onCategory = category => {
    this.setState({
      category
    });
  };

  clearState = () => {
    this.setState(this.initialState, () => {});
  };

  render() {
    const { amount, date, category } = this.state;
    const { onCreateCategory, categories } = this.props;
    return (
      <div className="container">
        <div className="flex-container">
          <Logo />
          <div className="sub-container seventy">
            <h2>Enter a transaction</h2>
            <div className="form-container">
              <div className="col-container fifty">
                <TransactionInput
                  label="Transaction:"
                  amount={amount}
                  onTransaction={this.onTransaction}
                  onMouseLeaveSanitizeAmount={this.onMouseLeaveSanitizeAmount}
                />
                <DateInput label="Date:" onDate={this.onDate} date={date} />
              </div>
              <div className="col-container fifty">
                <CreateCategory
                  onCreateCategory={onCreateCategory}
                  onCategory={this.onCategory}
                />
                <SelectReact
                  onCategory={this.onCategory}
                  selectedCategory={category}
                  categories={categories}
                  key="FormSelect"
                />
              </div>
            </div>
            <div className="button-container">
              <button type="submit" onClick={this.onClickSaveTransaction}>
                Submit
              </button>
              <button type="reset" onClick={this.clearState}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateTransaction;
