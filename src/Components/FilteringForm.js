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
      category: null,
      results: [],
      displayTable: "visible",
      displayParagraph: "hidden"
    };
  }

  handleMinTransaction = amount => {
    console.log(amount);
    this.setState(
      {
        amountMin: amount
      },
      () => console.log(this.state)
    );
  };

  handleMaxTransaction = amount => {
    console.log(amount);
    this.setState(
      {
        amountMax: amount
      },
      () => console.log(this.state)
    );
  };

  handleDateStart = date => {
    console.log(date);
    this.setState(
      {
        dateStart: date
      },
      () => console.log(this.state)
    );
  };

  handleDateEnd = date => {
    console.log(date);
    this.setState(
      {
        dateEnd: date
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

  handleSubmit = event => {
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
        category: null
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
      category,
      results,
      displayTable,
      displayParagraph
    } = this.state;

    const { categories } = this.props;

    console.log(categories);

    return (
      <div className="container">
        <div className="flex-container filtering-form">
          <ResultsTable
            results={results}
            displayTable={displayTable}
            displayParagraph={displayParagraph}
          />

          <div className="col-container fifty">
            <h2>Filter transactions</h2>
            <div className="form-container">
              <div className="col-container fifty">
                <h3>By date</h3>
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
              <div className="col-container fifty">
                <h3>By amount</h3>
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
            </div>
            <div className="col-container">
              <h3>By category</h3>
              <SelectReact
                handleCategory={this.handleCategory}
                selectedCategory={category}
                categories={categories}
                key="SortingFormSelect"
              />
            </div>
            <div className="button-container">
              <button type="submit" onClick={this.handleSubmit}>
                Search
              </button>
              <button type="reset">Reset</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SortingForm;
