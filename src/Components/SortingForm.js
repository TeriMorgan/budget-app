import React, { Component } from "react";
import DateInput from "./DateInput";
import TransactionInput from "./TransactionInput";
import ResultsTable from "./ResultsTable";
import axios from "axios";
import SelectReact from "./SelectReact";

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
      cat_id: null,
      results: [],
      displayTable: "hidden",
      displayParagraph: "hidden"
    };
  }

  handleMinTransaction = State => {
    console.log(State);
    this.setState(
      {
        amountMin: State.amount
      },
      () => console.log(this.state)
    );
  };

  handleMaxTransaction = State => {
    console.log(State);
    this.setState(
      {
        amountMax: State.amount
      },
      () => console.log(this.state)
    );
  };

  handleDateStart = State => {
    console.log(State);
    this.setState(
      {
        dateStart: State.date
      },
      () => console.log(this.state)
    );
  };

  handleDateEnd = State => {
    console.log(State);
    this.setState(
      {
        dateEnd: State.date
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
    const selectedCatId = this.state.cat_id ? this.state.cat_id.value : null;
    const formValues = {
      amountMin: this.state.amountMin,
      amountMax: this.state.amountMax,
      dateStart: this.state.dateStart,
      dateEnd: this.state.dateEnd,
      cat_id: selectedCatId
    };
    axios({
      method: "post",
      url: `${API_SORT_TRANSACTIONS}`,
      headers: { "content-type": "application/json" },
      data: formValues
    })
      .then(result => {
        const { results } = result.data;
        console.log(results.length);
        if (results.length === 0) {
          this.setState({
            results,
            displayTable: "hidden",
            displayParagraph: "visible"
          });
        } else {
          this.setState(
            {
              results,
              displayTable: "visible",
              displayParagraph: "hidden"
            },
            () => {
              console.log(result);
              this.clearState();
            }
          );
        }
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
        cat_id: null
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
      results,
      displayTable,
      displayParagraph
    } = this.state;
    return (
      <div className="container">
        <div className="flex-container column">
          <h2>Sort transactions</h2>
          <div className="form-container">
            <div className="col-container thirty-three">
              <h3>Sort by date</h3>
              <DateInput
                label="Earliest date:"
                handleDate={this.handleDateStart}
                date={dateStart}
              />
              <DateInput
                label="Latest date:"
                handleDate={this.handleDateEnd}
                date={dateEnd}
              />
            </div>
            <div className="col-container thirty-three">
              <h3>Sort by amount</h3>
              <TransactionInput
                label="Minimum amount:"
                handleTransaction={this.handleMinTransaction}
                amount={amountMin}
              />
              <TransactionInput
                label="Maximum amount:"
                handleTransaction={this.handleMaxTransaction}
                amount={amountMax}
              />
            </div>
            <div className="col-container thirty-three">
              <h3>Sort by category</h3>
              <SelectReact
                handleCatId={this.handleCatId}
                selectedCategoryId={cat_id}
              />
            </div>
          </div>
        </div>
        <div className="button-container">
          <button type="submit" onClick={this.handleSubmit}>
            Search
          </button>
          <button type="reset">Reset</button>
        </div>
        <ResultsTable
          results={results}
          displayTable={displayTable}
          displayParagraph={displayParagraph}
        />
      </div>
    );
  }
}

export default SortingForm;
