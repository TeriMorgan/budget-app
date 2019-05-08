import React, { Component } from "react";
import axios from "axios";

// const HOST = 'http://localhost';
const HOST = "http://terimorgan.com";

const API_SAVE_CATEGORY = HOST + "/api/contact/divvy-app/saveCategory.php";

class CreateCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      categories: []
    };
  }

  userEnterCategory = event => {
    this.setState({
      userInput: event.target.value
    });
  };

  handleCreateCategory = event => {
    const { categories, userInput } = this.state;
    const userInputLC = userInput.toLowerCase();

    //  Compare userInput to each array element
    for (let i = 0; i < categories.length; i++) {
      const categoryNameLC = categories[i].label.toLowerCase();
      if (categoryNameLC === userInputLC) {
        alert("Category already exists");
        this.setState({
          userInput: ""
        });
        return;
      }
    }
    // Add userInput to array only if it's a new category
    this.saveCategoryInDatabase();
  };

  saveCategoryInDatabase = () => {
    axios({
      method: "post",
      url: `${API_SAVE_CATEGORY}`,
      headers: { "content-type": "application/json" },
      data: this.state
    })
      .then(result => {
        const {
          data: { newId }
        } = result;
        this.updateCategoriesState(newId);
      })
      .catch(ex => {
        alert("The category cannot be saved.");
        console.warn(ex);
      });
  };

  updateCategoriesState = newId => {
    const { categories, userInput } = this.state;
    const categoryNew = { value: newId, label: userInput };
    if (newId !== -1) {
      categories.push(categoryNew);
    } else {
      alert("There was a problem retrieving the id from the database");
    }

    this.setState(
      {
        categories,
        userInput: ""
      },
      () => {
        console.log(this.state);
        this.props.handleCatId(categoryNew);
      }
    );
  };

  render() {
    const { userInput } = this.state;
    return (
      <div>
        <label>Category:</label>
        <div className="row-container">
          <input
            type="text"
            placeholder="Create a category"
            value={userInput}
            onChange={this.userEnterCategory}
          />
          <button onClick={this.handleCreateCategory}>Create</button>
        </div>
      </div>
    );
  }
}

export default CreateCategory;
