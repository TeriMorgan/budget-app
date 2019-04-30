import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";

// const HOST = 'http://localhost';
const HOST = "http://terimorgan.com";

const API_LOAD_CATEGORIES = HOST + "/api/contact/divvy-app/loadCategories.php";

class SelectReact extends Component {
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
      this.setState(
        {
          categories
        },
        () => {
          console.log(categories); //TODO: remove when done troubleshooting
        }
      );
    });
  }

  onSelectCategoryChange = event => {
    const selectedCategoryId = event.value;
    this.props.handleCatId(selectedCategoryId);
  };

  render() {
    const { selectedCategoryId, categories } = this.state;
    return (
      <div>
        <Select
          value={selectedCategoryId}
          onChange={this.onSelectCategoryChange}
          options={categories}
        />
      </div>
    );
  }
}

export default SelectReact;
