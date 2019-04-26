import React, { Component } from 'react'
import Logo from './Logo';
import TransactionDateInput from './TransactionDateInput';
import Select from './Select';
import axios from 'axios';

const API_SAVE_TRANSACTION  = 'http://terimorgan.com/api/contact/divvy-app/saveTransaction.php';

class Form extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       amount: "",
       date: "",
       cat_id: ""
    }
  }

  handleSubmit = event => {
    axios({
      method: 'post',
      url: `${API_SAVE_TRANSACTION}`,
      headers: {'content-type': 'application/json'},
      data: this.state
    })
    .then(result => {                                        
        return result.data;           // TODO: What goes here?
    })
    .catch(ex => {
      alert("The category cannot be saved.");
      console.warn(ex);
    });
    // console.log("handleSubmit ran");
  }

  handleTransactionDate = TransDateInputState => {
    console.log(TransDateInputState);
    this.setState({
      amount: TransDateInputState.amount,
      date: TransDateInputState.date
    }, 
    () => console.log(this.state));
  }

  handleCatId = SelectState => {
    console.log(SelectState);
    this.setState({
      cat_id: SelectState.selectedCategoryId
    },
    () => console.log(this.state));
  }
  
  render() {
    return (
      <div>
        <div className="container">
        <div className='flex-container'>   
            <Logo/>
            <TransactionDateInput handleTransactionDate={this.handleTransactionDate}/>
            <Select handleCatId={this.handleCatId}/>
        </div>
        <button type="submit" onClick={this.handleSubmit}>Submit</button>
    </div>
        
      </div>
    )
  }
}

export default Form
