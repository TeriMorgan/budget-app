import React, { Component } from "react";
import axios from "axios";

// const HOST = 'http://localhost';
const HOST = "http://terimorgan.com";

const API_LOAD_CATEGORIES = HOST + "/api/contact/divvy-app/loadCategories.php";

class SelectCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    this.loadCategories();
  }

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

  onSelectCategoryChange = event => {
    const selectedCategoryId = event.target.value;
    this.props.handleCatId(selectedCategoryId);
  };

  render() {
    const { categories } = this.state;
    const { selectedCategoryId } = this.props;
    return (
      <div>
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

export default SelectCategory;
