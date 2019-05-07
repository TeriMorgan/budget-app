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
  constructor(props) {
    super(props);

    this.state = {
      amount: "",
      date: "",
      cat_id: null
    };
  }

  handleSubmit = event => {
    const selectedCatId = this.state.cat_id ? this.state.cat_id.value : null;
    const formValues = {
      amount: this.state.amount,
      date: this.state.date,
      cat_id: selectedCatId
    };
    axios({
      method: "post",
      url: `${API_SAVE_TRANSACTION}`,
      headers: { "content-type": "application/json" },
      data: formValues
    })
      .then(result => {
        //Do I need to do something with result?
        console.log(result);
        this.clearState();
      })
      .catch(ex => {
        alert("The transaction cannot be saved.");
        console.warn(ex);
      });
  };

  handleTransaction = State => {
    console.log(State);
    this.setState(
      {
        amount: State.amount
      },
      () => console.log(this.state)
    );
  };

  handleDate = State => {
    console.log(State);
    this.setState(
      {
        date: State.date
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
        cat_id: null
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
                <CreateCategory handleCatId={this.handleCatId} />
                <SelectReact
                  handleCatId={this.handleCatId}
                  selectedCategoryId={cat_id}
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
