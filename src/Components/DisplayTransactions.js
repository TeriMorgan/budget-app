import React, { Component } from "react";

class DisplayTransactions extends Component {
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
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
            </tr>
            {initialResultList}
          </table>
        </div>
        <div className={displayFilteredTable}>
          <h2 className="results">Results</h2>
          <table>
            <tr>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
            </tr>
            {filterResultList}
          </table>
        </div>
      </div>
    );
  }
}

export default DisplayTransactions;
