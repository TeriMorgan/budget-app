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
      <div className="col-container fifty">
        <p className={displayParagraph}>
          No transactions meet your search criteria.
        </p>
        <div className={displayTable}>
          <h2 className="results">Results</h2>
          <table>
            <tr>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
            </tr>
            {/* <tr>              TODO: sample data
              <td>50.00</td>
              <td>2019-04-01</td>
              <td>Boogers</td>
            </tr>
            <tr>
              <td>50.00</td>
              <td>2019-04-01</td>
              <td>Boogers</td>
            </tr>
            <tr>
              <td>50.00</td>
              <td>2019-04-01</td>
              <td>Boogers</td>
            </tr>
            <tr>
              <td>50.00</td>
              <td>2019-04-01</td>
              <td>Boogers</td>
            </tr> */}
            {resultList}
          </table>
        </div>
      </div>
    );
  }
}

export default ResultsTable;
