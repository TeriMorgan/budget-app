import React, { Component } from "react";

class ResultsTable extends Component {
  render() {
    const { results, displayTable, displayParagraph } = this.props;

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    });

    const resultList = results.map(result => (
      <tr key={result.id}>
        <td>{formatter.format(result.amount)}</td>
        <td>{result.date}</td>
        <td>{result.category}</td>
      </tr>
    ));

    return (
      <div>
        <p className={displayParagraph}>
          No transactions meet your search criteria.
        </p>
        <div className={displayTable}>
          <h2>Results:</h2>
          <table>
            <tr>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
            </tr>
            {resultList}
          </table>
        </div>
      </div>
    );
  }
}

export default ResultsTable;
