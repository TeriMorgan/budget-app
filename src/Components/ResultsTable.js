import React, { Component } from "react";

class ResultsTable extends Component {
  render() {
    const { results } = this.props;
    const resultList = results.map(result => (
      <tr key={result.id}>
        <td>{result.amount}</td>
        <td>{result.date}</td>
        <td>{result.category}</td>
      </tr>
    ));

    return (
      <div>
        <h2>Results:</h2>
        <table>{resultList}</table>
      </div>
    );
  }
}

export default ResultsTable;
