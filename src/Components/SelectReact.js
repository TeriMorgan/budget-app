import React, { Component } from "react";
import Select from "react-select";

class SelectReact extends Component {
  render() {
    const { selectedCategory, categories, onChangeCategory } = this.props;
    return (
      <Select
        value={selectedCategory}
        onChange={onChangeCategory}
        options={categories}
      />
    );
  }
}

export default SelectReact;
