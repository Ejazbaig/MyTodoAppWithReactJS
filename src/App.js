import React, { Component } from "react";
import ActionBar from "./components/todoActionbar/actionBar";
import TodoItemContainer from "./components/todoItemContainer/itemContainer";
import "./App.css";
import uuid from "react-uuid";
// import axios from "./components/axios";
class App extends Component {
  constructor() {
    super();
    this.state = {
      todoListDetails: [],
      todoItemDescription: "",
      todoItemId: uuid(),
      checked: false,
      editItem: false,
      loaded: false
    };
    this.inputFocus = React.createRef();
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(response => response.json())
      .then(value => {
        value = value.splice(0, 10);
        let updatedItems = value.map(item => {
          return {
            id: `${item.id}`,
            item: item.title,
            title: item.title,
            done: false,
            checked: false,
            expand: false
          };
        });
        this.setState({
          todoListDetails: updatedItems
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    /// to make the todoListDetails empty when something changes at first because of the default data
    if (
      prevState.loaded === false &&
      prevState.todoItemId !== this.state.todoItemId
    ) {
      this.setState({
        todoListDetails: [],
        loaded: true,
        checked: false
      });
    }
    //// for checkbox checked if all the checkboxes are checked and viceversa
    let todoListDetails = this.state.todoListDetails;
    let checkedItems = todoListDetails.filter(item => item.checked === true);
    if (todoListDetails.length) {
      if (
        checkedItems.length === todoListDetails.length &&
        prevState.checked === false
      ) {
        this.setState({
          checked: true
        });
      }
      if (
        checkedItems.length !== todoListDetails.length &&
        prevState.checked === true
      ) {
        this.setState({
          checked: false
        });
      }
    }
  }

  inputFocusHandler = () => {
    this.inputFocus.current.focus();
  };

  handleInputChange = e => {
    this.setState({
      todoItemDescription: e.target.value,
      todoItemId: uuid()
    });
  };

  addTodoItem = () => {
    const newTodoItem = {
      id: this.state.todoItemId,
      title: this.state.todoItemDescription.substring(0, 100),
      item: this.state.todoItemDescription,
      done: false,
      checked: false,
      expand: false
    };
    if (!newTodoItem.item.trim()) {
      return;
    }
    const updatedItems = [newTodoItem, ...this.state.todoListDetails];
    this.setState({
      todoListDetails: updatedItems,
      todoItemDescription: "",
      todoItemId: uuid(),
      checked: false,
      editItem: false
    });
    this.inputFocusHandler();
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
      todoListDetails: updatedItems
    });
  };

  saveTodoOnEnter = e => {
    if (e.key === "Enter") {
      this.inputFocusHandler();
    }
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
      this.inputFocusHandler();
    }
  };

  showFullDetailsHandler = id => {
    let todoListDetails = this.state.todoListDetails;
    todoListDetails = todoListDetails.map(item => {
      if (item.id === id) {
        if (item.expand === false) {
          item.expand = true;
        } else {
          item.expand = false;
        }
      }
      return item;
    });
    this.setState({
      todoListDetails: todoListDetails
    });
  };

  dragOnStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  };
  dragOnOver = (e, id) => {
    e.preventDefault();
  };
  dragOnDrop = (e, id) => {
    e.preventDefault();
    let draggedItemId = e.dataTransfer.getData("Id");
    let todoListDetails = this.state.todoListDetails;
    let draggedItemIndex = 0;
    let droppedItemIndex = 0;
    for (let i = 0; i < todoListDetails.length; i++) {
      if (todoListDetails[i].id === draggedItemId) {
        draggedItemIndex = i;
      }
      if (todoListDetails[i].id === id) {
        droppedItemIndex = i;
      }
    }
    if (draggedItemIndex === droppedItemIndex) {
      return;
    }
    if (draggedItemIndex < droppedItemIndex) {
      let temp = todoListDetails[draggedItemIndex];
      for (let i = draggedItemIndex; i <= droppedItemIndex; i++) {
        todoListDetails[i] = todoListDetails[i + 1];
      }
      todoListDetails[droppedItemIndex] = temp;
      this.setState({
        todoListDetails
      });
    }
    if (draggedItemIndex > droppedItemIndex) {
      let temp = todoListDetails[draggedItemIndex];
      for (let i = draggedItemIndex; i >= droppedItemIndex; i--) {
        todoListDetails[i] = todoListDetails[i - 1];
      }
      todoListDetails[droppedItemIndex] = temp;
      this.setState({
        todoListDetails
      });
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
          inputFocus={this.inputFocus}
          selectAndDeselectAll={this.selectAndDeselectAll}
          checked={this.state.checked}
          edited={this.state.editItem}
        />
        <div className="todoItemWrapper" id="todoItemWrapper" ref={this.myRef}>
          {this.state.todoListDetails.map(item => (
            <TodoItemContainer
              key={item.id}
              deleteTodoItem={() => this.deleteTodoItem(item.id)}
              todoItemStrikeThrough={this.todoItemStrikeThrough}
              saveTodoOnEnter={this.saveTodoOnEnter}
              showFullDetailsHandler={() =>
                this.showFullDetailsHandler(item.id)
              }
              todoItemTitle={item.title}
              todoItem={item.item}
              id={item.id}
              toggledClass={item.done}
              checked={item.checked}
              handleCheckBox={this.handleCheckBox}
              handleEditIcon={() => this.handleEditIcon(item.id)}
              expand={item.expand}
              dragOnStart={e => this.dragOnStart(e, item.id)}
              dragOnOver={e => this.dragOnOver(e, item.id)}
              dragOnDrop={e => this.dragOnDrop(e, item.id)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
