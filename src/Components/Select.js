import React, { Component } from 'react';
import axios from 'axios';

// const HOST = 'http://localhost';
const HOST = 'http://terimorgan.com';
 
const API_SAVE_CATEGORY = HOST + '/api/contact/divvy-app/saveCategory.php';
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
          url: `${API_SAVE_CATEGORY}`,
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
            }
        );
        console.log("sCID ran");
      }

    handleCreateCategory = event => {
        const { categories, userInput } = this.state;
        const userInputLC = userInput.toLowerCase();

        //  Compare userInput to each array element
        var index = -1;
        for (var i = 0; i < categories.length; i++) {
            const categoryNameLC = categories[i].name.toLowerCase();
            if (categoryNameLC !== userInputLC) {
                continue;
            } else {
                index = i;
                alert("Category already exists");  
            }
        }  
        // Add userInput to array only if it's a new category
        if (index === -1) {
            const newId = this.saveCategoryInDatabase();                     
            if (newId !== -1) {
                categories.push({ id: newId, name: userInput });
            }
            else {
                alert("There was a problem retrieving the id from the database");
            }
        }

        this.setState({
            categories,              
            userInput: ''
        },
        () => console.log(this.state));
    }

    loadCategories() {
        axios({
            method: 'get',
            url: `${API_LOAD_CATEGORIES}`
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
        <select>
            <option value="">Select a category</option>
            {categories.map(category => (
                <option value={category.id}>{category.name}</option>
            ))}
        </select>
      </div>
    )
  }
}

export default Select
