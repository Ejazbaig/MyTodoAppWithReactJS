import React, { Component } from "react";
import ActionBar from "./components/todoActionbar/actionBar";
import TodoItemContainer from "./components/todoItemContainer/itemContainer";
import "./App.css";
import uuid from "react-uuid";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoListDetails: [],
      todoItemDescription: "",
      todoItemId: uuid(),
      checked: false,
      editItem: false
    };
  }

  handleInputChange = e => {
    this.setState({
      todoItemDescription: e.target.value
    });
  };

  addTodoItem = () => {
    const newTodoItem = {
      id: this.state.todoItemId,
      item: this.state.todoItemDescription,
      done: false,
      checked: false
    };
    if (!newTodoItem.item.trim()) {
      return;
    }
    const updatedItems = [...this.state.todoListDetails, newTodoItem];
    this.setState({
      todoListDetails: updatedItems,
      todoItemDescription: "",
      todoItemId: uuid(),
      checked: false,
      editItem: false
    });
    document.getElementById("todoAddTextBox").focus();
  };

  addTodoOnEnter = e => {
    if (e.key === "Enter") {
      this.addTodoItem();
    }
  };

  deleteSelected = e => {
    let todoListDetails = this.state.todoListDetails.filter(item => {
      return item.checked === false;
    });
    if (this.state.checked) {
      this.setState({
        todoListDetails,
        checked: false
      });
    } else {
      this.setState({
        todoListDetails
      });
    }
  };

  markSelected = e => {
    const selectedItems = this.state.todoListDetails.filter(item => {
      return item.checked === true;
    });
    let updatedItems = selectedItems.map(item => {
      let temp = item.done;
      item.done = !temp;
      return item;
    });
    const todoListDetails = this.state.todoListDetails;
    for (let i = 0; i < updatedItems.length; i++) {
      todoListDetails.forEach(item => {
        if (updatedItems[i].id === item.id) {
          item = updatedItems[i];
        }
      });
    }
    this.setState({
      todoListDetails
    });
  };

  selectAndDeselectAll = e => {
    if (this.state.todoListDetails.length) {
      let todoListDetails = this.state.todoListDetails;
      todoListDetails.forEach(item => (item.checked = e.target.checked));
      this.setState({
        todoListDetails,
        checked: e.target.checked ? true : false
      });
    }
  };

  handleCheckBox = e => {
    const todoListDetails = this.state.todoListDetails.map(item => {
      if (item.id === e.target.id) {
        if (e.target.checked === true) {
          item.checked = true;
        } else if (e.target.checked === false) {
          item.checked = false;
        }
      }
      return item;
    });
    this.setState({
      todoListDetails
    });
  };

  deleteTodoItem = id => {
    const filteredItems = this.state.todoListDetails.filter(
      item => item.id !== id
    );
    this.setState({
      todoListDetails: filteredItems
    });
  };

  todoItemStrikeThrough = e => {
    let updatedItems = this.state.todoListDetails.map(item => {
      if (item.id === e.target.id) {
        let temp = item.done;
        item.done = !temp;
      }
      return item;
    });
    this.setState({
      todoListDetails: [].concat(updatedItems)
    });
  };

  saveTodoOnEnter = e => {
    if (e.key === "Enter") {
      document.getElementById("todoAddTextBox").focus();
    }
  };

  saveHandleInputChange = e => {
    const todoItemDescription = this.state.todoListDetails.map(item => {
      if (item.id === e.target.id) {
        item.value = e.target.value;
      }
      return item;
    });
    this.setState({
      todoListDetails: todoItemDescription
    });
  };

  handleEditIcon = id => {
    if (this.state.todoItemDescription.length) {
      // eslint-disable-next-line no-restricted-globals
      let response = confirm("Click Ok to save the Todo Item");
      if (response === true) {
        this.addTodoItem();
      } else {
        alert("Please edit and save the todo Item");
      }
    } else {
      const filteredItems = this.state.todoListDetails.filter(
        item => item.id !== id
      );
      const selectedItems = this.state.todoListDetails.find(
        item => item.id === id
      );
      this.setState({
        todoListDetails: filteredItems,
        todoItemDescription: selectedItems.item,
        editItem: true,
        todoItemId: id
      });
      document.getElementById("todoAddTextBox").focus();
    }
  };

  render() {
    return (
      <div>
        <ActionBar
          todoItem={this.state.todoItemDescription}
          handleInputChange={this.handleInputChange}
          addTodoItem={this.addTodoItem}
          addTodoOnEnter={this.addTodoOnEnter}
          deleteSelected={this.deleteSelected}
          markSelected={this.markSelected}
          selectAndDeselectAll={this.selectAndDeselectAll}
          checked={this.state.checked}
          edited={this.state.editItem}
        />
        <div className="todoItemWrapper" id="todoItemWrapper">
          {this.state.todoListDetails.map(item => (
            <TodoItemContainer
              key={item.id}
              deleteTodoItem={() => this.deleteTodoItem(item.id)}
              todoItemStrikeThrough={this.todoItemStrikeThrough}
              saveTodoOnEnter={this.saveTodoOnEnter}
              handleInputChange={this.saveHandleInputChange}
              todoItem={item.item}
              id={item.id}
              toggledClass={item.done}
              checked={item.checked}
              handleCheckBox={this.handleCheckBox}
              handleEditIcon={() => this.handleEditIcon(item.id)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
