import React, { Component } from "react";
import axios from "axios";

// const HOST = 'http://localhost';
const HOST = "http://terimorgan.com";

const API_SAVE_CATEGORY = HOST + "/api/contact/divvy-app/saveCategory.php";
const API_LOAD_CATEGORIES = HOST + "/api/contact/divvy-app/loadCategories.php";

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      categories: [],
      error: null,
      categorySaved: false
    };
  }

  userEnterCategory = event => {
    this.setState({
      userInput: event.target.value
    });
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
    if (newId !== -1) {
      categories.push({ id: newId, name: userInput });
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
        this.props.handleCatId(newId);
      }
    );
  };

  handleCreateCategory = event => {
    const { categories, userInput } = this.state;
    const userInputLC = userInput.toLowerCase();

    //  Compare userInput to each array element
    for (let i = 0; i < categories.length; i++) {
      const categoryNameLC = categories[i].name.toLowerCase();
      if (categoryNameLC === userInputLC) {
        alert("Category already exists");
        return;
      }
    }
    // Add userInput to array only if it's a new category
    this.saveCategoryInDatabase();
  };

  loadCategories() {
    axios({
      method: "get",
      url: `${API_LOAD_CATEGORIES}`
    }).then(result => {
      const { categories } = result.data;
      this.setState({
        categories
      });
    });
  }

  componentDidMount() {
    this.loadCategories();
  }

  onSelectCategoryChange = event => {
    const selectedCategoryId = event.target.value;
    this.props.handleCatId(selectedCategoryId);
  };

  render() {
    const { userInput, categories } = this.state;
    const { selectedCategoryId } = this.props;
    return (
      <div className="sub-container">
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
        <select
          value={selectedCategoryId}
          onChange={this.onSelectCategoryChange}
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default Select;
