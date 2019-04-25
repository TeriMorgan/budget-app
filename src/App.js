import React, { Component } from 'react';
//import logo from './logo.svg';
//import Form from './Components/Form';
import Logo from './Components/Logo';
import Select from './Components/Select';
import axios from 'axios';

const API_SAVE_TRANSACTION  = 'http://terimorgan.com/api/contact/divvy-app/saveCategory.php';

class App extends Component {

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
      },
      () => console.log(this.state));
  }
  
  userEnterDate = event => {
      this.setState({
        date: event.target.value
      },
      () => console.log(this.state));
    }

    handleSubmit = event => {
      axios({
        method: 'post',
        url: `${API_SAVE_TRANSACTION}`,
        headers: {'content-type': 'application/json'},
        data: this.state
      })
      .then(result => {                                        
          return result.data.newId;           // TODO: What goes here?
      //   this.setState({  
      //     categorySaved:result.data.sent
      //   })
      })
      // .catch(                                And here?
      //     error => {
      //         return -1;
      //     }
      // );
      console.log("handleSubmit ran");
    }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className='flex-container'>   
              <Logo/>

               {/* TransactionInput */}
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

              <Select/>
          </div>
          <button type="submit" onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

export default App;
