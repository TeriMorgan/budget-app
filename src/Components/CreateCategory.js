import React, { Component } from "react";

class CreateCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ""
    };
  }

  onChangeCategory = event => {
    this.setState({
      userInput: event.target.value
    });
  };

  onClick = event => {
    const newCategoryName = this.state.userInput;
    this.props.onCreateCategory(newCategoryName, this.props.onChangeCategory);
    this.setState({
      userInput: ""
    });
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
            onChange={this.onChangeCategory}
          />
          <button onClick={this.onClick}>Create</button>
        </div>
      </div>
    );
  }
}

export default CreateCategory;
