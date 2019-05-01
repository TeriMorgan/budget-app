import React, { Component } from "react";
//import logo from './logo.svg';
import Form from "./Components/Form";
import SortingForm from "./Components/SortingForm";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Form />
        <SortingForm />
      </div>
    );
  }
}

export default App;
