import React, { Component } from "react";
import Select from "react-select";

class SelectReact extends Component {
  constructor(props) {
    super(props);

    var s = "Huh";
    console.log(s);
  }

  componentDidUpdate(nextProps) {
    console.log("NextProps");
    console.log(nextProps);
    console.log("This.Props");
    console.log(this.props);
  }

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
