import React, { Component } from "react";
import axios from "axios";
import TransactionForm from "./TransactionForm";
import FilteringForm from "./FilteringForm";

// const HOST = 'http://localhost';
const HOST = "http://terimorgan.com";

const API_SAVE_CATEGORY = HOST + "/api/contact/divvy-app/saveCategory.php";
const API_LOAD_CATEGORIES = HOST + "/api/contact/divvy-app/loadCategories.php";

class Budget extends Component {
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
      const categoriesRemapped = categories.map(category => ({
        value: category.id,
        label: category.name
      }));
      this.setState(
        {
          categories: categoriesRemapped
        },
        () => {
          console.log(categories);
        }
      );
    });
  }

  handleCreateCategory = (newCategoryName, handleCategory) => {
    const { categories } = this.state;
    const newCategoryNameLC = newCategoryName.toLowerCase();

    //  Compare newCategory to each array element
    for (let i = 0; i < categories.length; i++) {
      const categoryNameLC = categories[i].label.toLowerCase();
      if (categoryNameLC === newCategoryNameLC) {
        alert("Category already exists");
        return;
      }
    }
    // Add userInput to array only if it's a new category
    this.saveCategoryInDatabase(newCategoryNameLC, handleCategory);
  };

  saveCategoryInDatabase = (newCategoryNameLC, handleCategory) => {
    axios({
      method: "post",
      url: `${API_SAVE_CATEGORY}`,
      headers: { "content-type": "application/json" },
      data: { category: newCategoryNameLC }
    })
      .then(result => {
        const {
          data: { newId }
        } = result;
        // this.updateCategoriesState(newId, newCategoryNameLC, handleCategory);
        this.loadCategories();
        const categoryNew = { value: newId, label: newCategoryNameLC };
        handleCategory(categoryNew);
      })
      .catch(ex => {
        alert("The category cannot be saved.");
        console.warn(ex);
      });
  };

  //   updateCategoriesState = (newId, newCategoryNameLC, handleCategory) => {
  //     const { categories } = this.state;
  //     const categoryNew = { value: newId, label: newCategoryNameLC };
  //     if (newId !== -1) {
  //       categories.push(categoryNew);
  //     } else {
  //       alert("There was a problem retrieving the id from the database");
  //     }

  //     this.setState(
  //       {
  //         categories
  //       },
  //       () => handleCategory(categoryNew)
  //     );
  //   };

  render() {
    const { categories } = this.state;
    return (
      <div>
        <TransactionForm
          handleCreateCategory={this.handleCreateCategory}
          categories={categories}
        />
        <FilteringForm categories={categories} />
      </div>
    );
  }
}

export default Budget;
