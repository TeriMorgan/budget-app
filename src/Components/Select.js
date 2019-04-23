import React, { Component } from 'react';
import axios from 'axios';

// const HOST = 'http://localhost';
const HOST = 'http://terimorgan.com';
 
const API_CREATE_CATEGORY = HOST + '/api/contact/divvy-app/category.php';
const API_LOAD_CATEGORIES = HOST + '/api/contact/divvy-app/loadCategories.php';

class Select extends Component {
    constructor(props) {
      super(props)   
      this.state = {
        userInput: '',
        categories: [],
        error: null,
        categorySaved: false
      }
    }

    userEnterCategory = event => {
        this.setState({
            userInput: event.target.value,
        },
        () => console.log(this.state));
    }

    saveCategoryInDatabase = () => {
        axios({
          method: 'post',
          url: `${API_CREATE_CATEGORY}`,
          headers: {'content-type': 'application/json'},
          data: this.state
        })
        .then(result => {
            return result.data.newId;
            //   this.setState({
            //     categorySaved:result.data.sent
            //   })
        })
        .catch(
            error => {
                return -1;
                // this.setState({error: error.message})
            }
        );
        console.log("sCID ran");
      }

    handleCreateCategory = event => {
        const { categories, userInput } = this.state;
        
        // TODO: check if categories contains the userInput (case-insensitive)
        //  Use an array method to check each elment of the array and compare it to the userInput
        if (categories.indexOf(userInput.toLowerCase()) === -1) {
            const newId = this.saveCategoryInDatabase();
            if (newId !== -1) {
                categories.push({ name: userInput, id: newId });
            }
            else {
                // TODO: What should happen if there was an error saving the new category
            }
        } else {
            alert("Category already exists");    
        }       
        this.setState({
            categories,              //same as categories: categories
            userInput: ''
        },
        () => console.log(this.state));
    }

    loadCategories() {
        axios({
            method: 'get',
            url: `${API_LOAD_CATEGORIES}`
            //headers: {'content-type': 'application/json'}
          })
          .then(result => {
            const {categories} = result.data;
            this.setState({
              categories
            })
          })
          console.log("loadCategories ran");
    }
    
    componentDidMount() {
        this.loadCategories();
    }
    
  render() {
    const {userInput, categories} = this.state;
    return (
      <div className='sub-container'>
        <label>Category:</label>
        <div className="row-container">
            <input 
            type="text" 
            placeholder="Create a category"
            value={userInput} 
            onChange={this.userEnterCategory}>
            </input>
            <button onClick={this.handleCreateCategory}>Create</button>
        </div>
        <select placeholder="Select a category">
            {categories.map(category => (
                <option value={category.id}>{category.name}</option>
            ))}
        </select>
      </div>
    )
  }
}

export default Select
