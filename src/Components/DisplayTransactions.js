import React, { Component } from "react";

// const { initialResults, results } = this.props;

class DisplayTransactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialResults: this.props.initialResults,
      results: this.props.results,
      sortOrder: {}
    };
  }

  onClickToggle = (array, key) => {
    let sortedArray = [];
    let isAscending = true;

    // On first sort, always ascending
    if (this.state.sortOrder[key]) {
      isAscending = !this.state.sortOrder[key];
    }
    if (array.length === 1) {
      sortedArray = array;
      // Sort for strings
    } else if (isNaN(array[0][key])) {
      if (!isAscending) {
        sortedArray = array.sort(function(a, b) {
          return b[key].localeCompare(a[key]);
        });
      } else {
        sortedArray = array.sort(function(a, b) {
          return a[key].localeCompare(b[key]);
        });
      }
      // Sort for numbers
    } else if (isAscending) {
      sortedArray = array.sort(function(a, b) {
        return a[key] - b[key];
      });
    } else {
      sortedArray = array.sort(function(a, b) {
        return b[key] - a[key];
      });
    }
    this.setState({
      array: sortedArray,
      sortOrder: {
        [key]: isAscending
      }
    });
  };

  render() {
    const {
      initialResults,
      results,
      displayInitialTable,
      displayFilteredTable,
      displayParagraph
    } = this.props;

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    });

    // The initialResults are passed from ManageTransactions.js when it runs loadRecentTransactions.
    const initialResultList = initialResults.map(result => (
      <tr key={result.id}>
        <td>{formatter.format(result.amount)}</td>
        <td>{result.date}</td>
        <td>{result.category}</td>
      </tr>
    ));

    // The results are passed from DisplayTransactions.js when a user chooses to filter transactions.
    // The table with filterResultList is set to display and replaces the table with initialResultList.
    const filterResultList = results.map(result => (
      <tr key={result.id}>
        <td>{formatter.format(result.amount)}</td>
        <td>{result.date}</td>
        <td>{result.category}</td>
      </tr>
    ));

    return (
      <div className="col-container fifty table-text">
        <p className={displayParagraph}>
          No transactions meet your search criteria.
        </p>
        <div className={displayInitialTable}>
          <h2 className="results">Results</h2>
          <table>
            <tr>
              <th onClick={() => this.onClickToggle(initialResults, "amount")}>
                Amount
                <img src="http://terimorgan.com/sortSymbol.png" alt="sort" />
              </th>
              <th onClick={() => this.onClickToggle(initialResults, "date")}>
                Date
                <img src="http://terimorgan.com/sortSymbol.png" alt="sort" />
              </th>
              <th
                onClick={() => this.onClickToggle(initialResults, "category")}
              >
                Category
                <img src="http://terimorgan.com/sortSymbol.png" alt="sort" />
              </th>
            </tr>
            {initialResultList}
          </table>
        </div>
        <div className={displayFilteredTable}>
          <h2 className="results">Results</h2>
          <table>
            <tr>
              <th onClick={() => this.onClickToggle(results, "amount")}>
                Amount
                <img src="http://terimorgan.com/sortSymbol.png" alt="sort" />
              </th>
              <th onClick={() => this.onClickToggle(results, "date")}>
                Date
                <img src="http://terimorgan.com/sortSymbol.png" alt="sort" />
              </th>
              <th onClick={() => this.onClickToggle(results, "category")}>
                Category
                <img src="http://terimorgan.com/sortSymbol.png" alt="sort" />
              </th>
            </tr>
            {filterResultList}
          </table>
        </div>
      </div>
    );
  }
}

export default DisplayTransactions;
