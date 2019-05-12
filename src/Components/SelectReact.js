import React, { Component } from "react";
import Select from "react-select";

class SelectReact extends Component {
  render() {
    const { selectedCategory, categories, onCategory } = this.props;
    return (
      <Select
        value={selectedCategory}
        onChange={onCategory}
        options={categories}
      />
    );
  }
}

export default SelectReact;
