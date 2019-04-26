import React, { Component } from 'react'


class TransactionDateInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
        amount: "",
        date: ""
    }
  }

  handleUserEnterTransaction = event => {
    this.setState({
      amount: event.target.value
    }, () => {
      this.updateFormState();
    } 
  )}

  handleUserEnterDate = event => {        
    this.setState({                       
      date: event.target.value
    }, () => {
      this.updateFormState();
    } 
  )}

  updateFormState() {
		console.log(this.state);
    this.props.handleTransactionDate(this.state);
  }

      
  
  render() {
    return (
      <div className="sub-container">
        <label>Transaction:</label>
        <input 
            type="text" 
            name="transaction" 
            placeholder="Enter transaction" 
            onChange={this.handleUserEnterTransaction} 
            required>
        </input>
        <label>Date:</label>
        <input 
            type="date" 
            name="date"
            onChange = {this.handleUserEnterDate}
            required>

        </input>
      </div>
    )
  }
}

export default TransactionDateInput

    
