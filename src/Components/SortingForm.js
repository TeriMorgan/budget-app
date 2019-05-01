import React, { Component } from "react";
import DateInput from "./DateInput";
import TransactionInput from "./TransactionInput";
import SelectCategory from "./SelectCategory";
import ResultsTable from "./ResultsTable";
import axios from "axios";

const API_SORT_TRANSACTIONS =
  "http://terimorgan.com/api/contact/divvy-app/sortTransactions.php";

class SortingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateStart: "",
      dateEnd: "",
      amountMin: "",
      amountMax: "",
      cat_id: "",
      results: []
    };
  }

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

  handleSubmit = event => {
    axios({
      method: "post",
      url: `${API_SORT_TRANSACTIONS}`,
      headers: { "content-type": "application/json" },
      data: this.state
    })
      .then(result => {
        const { results } = result.data;
        this.setState(
          {
            results
          },
          () => {
            console.log(result);
            this.clearState();
          }
        );
      })
      .catch(ex => {
        alert("Something went wrong.");
        console.warn(ex);
      });
  };

  clearState = () => {
    this.setState(
      {
        dateStart: "",
        dateEnd: "",
        amountMin: "",
        amountMax: "",
        category: ""
      },
      () => {
        console.log(this.state);
      }
    );
  };

  render() {
    const {
      amountMin,
      amountMax,
      dateStart,
      dateEnd,
      cat_id,
      results
    } = this.state;
    return (
      <div className="container">
        <div className="flex-container column">
          <h2>Sort transactions:</h2>
          <div className="form-container">
            <div className="col-container thirty-three">
              <h3>Sort by date:</h3>
              <DateInput
                label="Earliest date:"
                handleDate={this.handleDate}
                date={dateStart}
              />
              <DateInput
                label="Latest date:"
                handleDate={this.handleDate}
                date={dateEnd}
              />
            </div>
            <div className="col-container thirty-three">
              <h3>Sort by transaction amount:</h3>
              <TransactionInput
                label="Minimum amount:"
                handleTransaction={this.handleTransaction}
                amount={amountMin}
              />
              <TransactionInput
                label="Maximum amount:"
                handleTransaction={this.handleTransaction}
                amount={amountMax}
              />
            </div>
            <div className="col-container thirty-three">
              <h3>Sort by category:</h3>
              <SelectCategory
                handleCatId={this.handleCatId}
                selectedCategoryId={cat_id}
              />
            </div>
          </div>
        </div>
        <button type="submit" onClick={this.handleSubmit}>
          Search
        </button>
        <div>
          <ResultsTable results={results} />
        </div>
      </div>
    );
  }
}

export default SortingForm;
