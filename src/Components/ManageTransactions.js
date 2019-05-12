import React, { Component } from "react";
import axios from "axios";
import CreateTransaction from "./CreateTransaction";
import FilterTransactions from "./FilterTransactions";

// const HOST = 'http://localhost';
const HOST = "http://terimorgan.com";

const API_SAVE_CATEGORY = HOST + "/api/contact/divvy-app/saveCategory.php";
const API_LOAD_CATEGORIES = HOST + "/api/contact/divvy-app/loadCategories.php";
const API_LOAD_RECENT_TRANSACTIONS =
  HOST + "/api/contact/divvy-app/loadRecentTransactions.php";

class ManageTransactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      initialResults: [],
      displayInitialTable: "visible",
      displayParagraph: "hidden"
    };
  }

  componentDidMount() {
    this.loadCategories();
    this.loadRecentTransactions();
  }

  loadRecentTransactions = () => {
    axios({
      method: "get",
      url: `${API_LOAD_RECENT_TRANSACTIONS}`
    })
      .then(result => {
        const { initialResults } = result.data;
        if (initialResults.length === 0) {
          this.setState({
            initialResults,
            displayInitialTable: "hidden",
            displayParagraph: "visible"
          });
        } else {
          this.setState({
            initialResults
          });
        }
      })
      .catch(ex => {
        alert("Something went wrong while trying to load recent transactions.");
        console.warn(ex);
      });
  };

  loadCategories() {
    axios({
      method: "get",
      url: `${API_LOAD_CATEGORIES}`
    })
      .then(result => {
        const { categories } = result.data;
        const categoriesRemapped = categories.map(category => ({
          value: category.id,
          label: category.name
        }));
        this.setState({
          categories: categoriesRemapped
        });
      })
      .catch(ex => {
        alert("Something went wrong while trying to load categories.");
        console.warn(ex);
      });
  }

  onCreateCategory = (newCategoryName, onCategory) => {
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
    this.saveCategoryInDatabase(newCategoryNameLC, onCategory);
  };

  saveCategoryInDatabase = (newCategoryNameLC, onCategory) => {
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
        // this.updateCategoriesState(newId, newCategoryNameLC, onCategory);
        this.loadCategories();
        const categoryNew = { value: newId, label: newCategoryNameLC };
        onCategory(categoryNew);
      })
      .catch(ex => {
        alert("The category cannot be saved.");
        console.warn(ex);
      });
  };

  render() {
    const {
      categories,
      initialResults,
      displayParagraph,
      displayInitialTable
    } = this.state;
    return (
      <div>
        <CreateTransaction
          loadRecentTransactions={this.loadRecentTransactions}
          onCreateCategory={this.onCreateCategory}
          categories={categories}
        />
        <FilterTransactions
          categories={categories}
          initialResults={initialResults}
          displayParagraph={displayParagraph}
          displayInitialTable={displayInitialTable}
        />
      </div>
    );
  }
}

export default ManageTransactions;
