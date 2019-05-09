import React, { Component } from "react";
import Logo from "./Logo";
import TransactionInput from "./TransactionInput";
import CreateCategory from "./CreateCategory";
import axios from "axios";
import DateInput from "./DateInput";
import SelectReact from "./SelectReact";

const API_SAVE_TRANSACTION =
  "http://terimorgan.com/api/contact/divvy-app/saveTransaction.php";

class Form extends Component {
  initialState = {
    amount: "",
    date: "",
    category: null
  };

  constructor(props) {
    super(props);

    this.state = this.initialState;
  }

  handleSubmit = event => {
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
        console.log(result);
        this.clearState();
      })
      .catch(ex => {
        alert("The transaction cannot be saved.");
        console.warn(ex);
      });
  };

  handleTransaction = amount => {
    console.log(amount);
    this.setState(
      {
        amount
      },
      () => console.log(this.state)
    );
  };

  handleDate = date => {
    console.log(date);
    this.setState(
      {
        date
      },
      () => console.log(this.state)
    );
  };

  handleCategory = category => {
    console.log(category);
    this.setState(
      {
        category
      },
      () => console.log(this.state)
    );
  };

  clearState = () => {
    this.setState(this.initialState, () => {
      console.log(this.state);
    });
  };

  render() {
    const { amount, date, category } = this.state;
    const { handleCreateCategory, categories } = this.props;
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
                  handleTransaction={this.handleTransaction}
                  amount={amount}
                />
                <DateInput
                  label="Date:"
                  handleDate={this.handleDate}
                  date={date}
                />
              </div>
              <div className="col-container fifty">
                <CreateCategory
                  handleCreateCategory={handleCreateCategory}
                  handleCategory={this.handleCategory}
                />
                <SelectReact
                  handleCategory={this.handleCategory}
                  selectedCategory={category}
                  categories={categories}
                  key="FormSelect"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="button-container">
          <button type="submit" onClick={this.handleSubmit}>
            Submit
          </button>
          <button type="reset">Reset</button>
        </div>
      </div>
    );
  }
}

export default Form;
