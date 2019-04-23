import React, { Component } from 'react'


class TransactionInput extends Component {
  constructor() {
    super()
    this.state = {
        amount: "",
        date: ""
    }
  }

  userEnterTransaction = event => {
      this.setState({
        amount: event.target.value
      })
      console.log(this.state);
    }
  
    userEnterDate = event => {
      this.setState({
        date: event.target.value
      })
      console.log(this.state);
    }
      
  
  render() {
    return (
      <div className="sub-container">
        <label>Transaction:</label>
        <input 
            type="text" 
            name="transaction" 
            placeholder="Enter transaction" 
            onChange={this.userEnterTransaction} 
            required>
        </input>
        <label>Date:</label>
        <input 
            type="date" 
            name="date"
            onChange = {this.userEnterDate}
            required>

        </input>
      </div>
    )
  }
}

export default TransactionInput

    
