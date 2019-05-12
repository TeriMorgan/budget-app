import React, { Component } from "react";
import DateInput from "./DateInput";
import TransactionInput from "./TransactionInput";
import DisplayTransactions from "./DisplayTransactions";
import axios from "axios";
import SelectReact from "./SelectReact";

const API_SORT_TRANSACTIONS =
  "http://terimorgan.com/api/contact/divvy-app/sortTransactions.php";

class FilterTransactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateStart: "",
      dateEnd: "",
      amountMin: "",
      amountMax: "",
      category: null,
      results: [],
      displayInitialTable: this.props.displayInitialTable,
      displayFilteredTable: "hidden",
      displayParagraph: this.props.displayParagraph
    };
  }

  onMinTransaction = amount => {
    this.setState({
      amountMin: amount
    });
  };

  onMaxTransaction = amount => {
    this.setState({
      amountMax: amount
    });
  };

  onDateStart = date => {
    this.setState({
      dateStart: date
    });
  };

  onDateEnd = date => {
    this.setState({
      dateEnd: date
    });
  };

  onCategory = category => {
    this.setState({
      category
    });
  };

  onSubmit = event => {
    const selectedCatId = this.state.category
      ? this.state.category.value
      : null;
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
        if (results.length === 0) {
          this.setState({
            results,
            displayInitialTable: "hidden",
            displayFilteredTable: "hidden",
            displayParagraph: "visible"
          });
        } else {
          this.setState({
            results,
            displayInitialTable: "hidden",
            displayFilteredTable: "visible",
            displayParagraph: "hidden"
          });
        }
      })
      .catch(ex => {
        alert("Something went wrong while trying to filter.");
        console.warn(ex);
      });
  };

  clearState = () => {
    this.setState({
      dateStart: "",
      dateEnd: "",
      amountMin: "",
      amountMax: "",
      category: null
    });
  };

  render() {
    const {
      amountMin,
      amountMax,
      dateStart,
      dateEnd,
      category,
      results,
      displayInitialTable,
      displayFilteredTable,
      displayParagraph
    } = this.state;

    const { categories } = this.props;

    return (
      <div className="container">
        <div className="flex-container filtering-form">
          <DisplayTransactions
            initialResults={this.props.initialResults}
            results={results}
            displayInitialTable={displayInitialTable}
            displayFilteredTable={displayFilteredTable}
            displayParagraph={displayParagraph}
          />

          <div className="col-container fifty">
            <h2>Filter transactions</h2>
            <div className="form-container">
              <div className="col-container fifty">
                <h3>By date</h3>
                <DateInput
                  label="Earliest date:"
                  onDate={this.onDateStart}
                  date={dateStart}
                />
                <DateInput
                  label="Latest date:"
                  onDate={this.onDateEnd}
                  date={dateEnd}
                />
              </div>
              <div className="col-container fifty">
                <h3>By amount</h3>
                <TransactionInput
                  label="Minimum amount:"
                  onTransaction={this.onMinTransaction}
                  amount={amountMin}
                />
                <TransactionInput
                  label="Maximum amount:"
                  onTransaction={this.onMaxTransaction}
                  amount={amountMax}
                />
              </div>
            </div>
            <div className="col-container">
              <h3>By category</h3>
              <SelectReact
                onCategory={this.onCategory}
                selectedCategory={category}
                categories={categories}
                key="SortingFormSelect"
              />
            </div>
            <div className="button-container">
              <button type="submit" onClick={this.onSubmit}>
                Search
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

export default FilterTransactions;
