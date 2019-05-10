import React, { Component } from "react";
import Select from "react-select";

class SelectReact extends Component {
  render() {
    const { selectedCategory, categories, handleCategory } = this.props;
    return (
      <Select
        value={selectedCategory}
        onChange={handleCategory}
        options={categories}
      />
    );
  }
}

export default SelectReact;
