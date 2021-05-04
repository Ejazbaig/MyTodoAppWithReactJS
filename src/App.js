import React, { Component } from "react";
import ActionBar from "./components/todoActionbar/actionBar";
import TodoItemContainer from "./components/todoItemContainer/itemContainer";
import "./App.css";
import uuid from "react-uuid";
import CheckBox from "./components/checkBox/CheckBox";
// import axios from "./components/axios";
// require("dotenv").config();
// const API_URL = process.env.REACT_APP_API_URL;

class App extends Component {
  state = {
    todoListDetails: [],
    todoItemDescription: "",
    todoItemId: uuid(),
    checked: false,
    editItem: false,
    loaded: false,
    completedTasks: false,
  };
  inputFocus = React.createRef();

  componentDidMount() {
    const localStorageItems = { ...localStorage };
    let myArray = [];
    for (let [id, item] of Object.entries(localStorageItems)) {
      item = JSON.parse(item);
      const newTodoItem = {
        id: id,
        title: item[0].substring(0, 100),
        item: item[0],
        done: item[1],
        checked: false,
        expand: false,
      };
      myArray.push(newTodoItem);
    }
    this.setState({
      todoListDetails: myArray,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    //// for checkbox checked if all the checkboxes are checked and viceversa
    let todoListDetails = this.state.todoListDetails;
    let checkedItems = todoListDetails.filter((item) => item.checked === true);
    if (todoListDetails.length) {
      if (
        checkedItems.length === todoListDetails.length &&
        prevState.checked === false
      ) {
        this.setState({
          checked: true,
        });
      }

      let incompleteTodoListTasks = todoListDetails.filter(
        (item) => item.done === false
      );
      let completedTodoListTasks = todoListDetails.filter(
        (item) => item.done === true
      );
      if (
        this.state.completedTasks === false &&
        incompleteTodoListTasks.length
      ) {
        let checkedItems = incompleteTodoListTasks.filter(
          (item) => item.checked === true
        );
        if (
          checkedItems.length === incompleteTodoListTasks.length &&
          prevState.checked === false
        ) {
          this.setState({
            checked: true,
          });
        }
        if (
          checkedItems.length !== incompleteTodoListTasks.length &&
          prevState.checked === true
        ) {
          this.setState({
            checked: false,
          });
        }
      }
      if (this.state.completedTasks && completedTodoListTasks.length) {
        let checkedItems = completedTodoListTasks.filter(
          (item) => item.checked === true
        );
        if (
          checkedItems.length === completedTodoListTasks.length &&
          prevState.checked === false
        ) {
          this.setState({
            checked: true,
          });
        }
        if (
          checkedItems.length !== completedTodoListTasks.length &&
          prevState.checked === true
        ) {
          this.setState({
            checked: false,
          });
        }
      }
      ////  to check if all the items in completed tasks or incompleted tasks are marked or unmarked, then the select and deslect button should be off
      if (this.state.checked) {
        if (
          (!this.state.completedTasks &&
            incompleteTodoListTasks.length === 0) ||
          (this.state.completedTasks && completedTodoListTasks.length === 0)
        ) {
          this.setState({
            checked: false,
          });
        }
      }
    }
    //// if the last item in the list is deleted by its own delete handler then select and deselct all was not vanishing. so with this its resolved
    if (prevState.todoListDetails.length && todoListDetails.length === 0) {
      this.setState({
        checked: false,
      });
    }
  }

  inputFocusHandler = () => {
    this.inputFocus.current.focus();
  };

  handleInputChange = (e) => {
    this.setState({
      todoItemDescription: e.target.value,
      todoItemId: uuid(),
    });
  };

  addTodoItem = () => {
    const newTodoItem = {
      id: this.state.todoItemId,
      title:
        this.state.todoItemDescription.length > 97
          ? this.state.todoItemDescription.substring(0, 100) + "..."
          : this.state.todoItemDescription.substring(0, 100),
      item: this.state.todoItemDescription,
      done: false,
      checked: false,
      expand: false,
    };
    if (!newTodoItem.item.trim()) {
      return;
    }
    const data = [newTodoItem.item, newTodoItem.done];
    localStorage.setItem(newTodoItem.id, JSON.stringify(data));
    const updatedItems = [newTodoItem, ...this.state.todoListDetails];
    this.setState({
      todoListDetails: updatedItems,
      todoItemDescription: "",
      todoItemId: uuid(),
      checked: false,
      editItem: false,
      completedTasks: false,
    });
    this.inputFocusHandler();
  };

  addTodoOnEnter = (e) => {
    if (e.key === "Enter") {
      this.addTodoItem();
    }
  };

  deleteSelected = (e) => {
    let todoListDetails = this.state.todoListDetails.filter((item) => {
      if (item.checked === true) {
        localStorage.removeItem(item.id);
      }
      return item.checked === false;
    });
    if (this.state.checked) {
      this.setState({
        todoListDetails,
        checked: false,
      });
    } else {
      this.setState({
        todoListDetails,
      });
    }
  };

  markSelected = (e) => {
    let todoListDetails = this.state.todoListDetails.filter((item) => {
      if (item.checked === true) {
        let temp = item.done;
        item.done = !temp;
        item.checked = false;
        let tempData = localStorage.getItem(item.id);
        let tempItem = JSON.parse(tempData);
        tempItem[1] = !temp;
        localStorage.setItem(item.id, JSON.stringify(tempItem));
      }
      return item;
    });
    this.setState({
      todoListDetails,
    });
  };

  selectAndDeselectAll = (e) => {
    if (this.state.todoListDetails.length) {
      let todoListDetails = this.state.todoListDetails;
      if (this.state.completedTasks) {
        todoListDetails = todoListDetails.map((item) => {
          if (item.done === true) {
            item.checked = e.target.checked;
          }
          return item;
        });
      }
      if (!this.state.completedTasks) {
        todoListDetails = todoListDetails.map((item) => {
          if (item.done === false) {
            item.checked = e.target.checked;
          }
          return item;
        });
      }

      // todoListDetails.forEach((item) => (item.checked = e.target.checked));
      this.setState({
        todoListDetails,
        checked: e.target.checked ? true : false,
      });
    }
  };

  handleCheckBox = (e) => {
    const todoListDetails = this.state.todoListDetails.map((item) => {
      if (item.id === e.target.id) {
        if (e.target.checked === true) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      }
      return item;
    });
    this.setState({
      todoListDetails,
    });
  };

  deleteTodoItem = (id) => {
    const filteredItems = this.state.todoListDetails.filter(
      (item) => item.id !== id
    );
    localStorage.removeItem(id);
    this.setState({
      todoListDetails: filteredItems,
    });
  };

  todoItemStrikeThrough = (e) => {
    let updatedItems = this.state.todoListDetails.map((item) => {
      if (item.id === e.target.id) {
        let temp = item.done;
        item.done = !temp;
        item.checked = false;
        let tempData = localStorage.getItem(item.id);
        let tempItem = JSON.parse(tempData);
        tempItem[1] = !temp;
        localStorage.setItem(item.id, JSON.stringify(tempItem));
      }
      return item;
    });
    this.setState({
      todoListDetails: updatedItems,
    });
  };

  saveTodoOnEnter = (e) => {
    if (e.key === "Enter") {
      this.inputFocusHandler();
    }
  };

  handleEditIcon = (id) => {
    if (this.state.todoItemDescription.length) {
      // eslint-disable-next-line no-restricted-globals
      let response = confirm("Click Ok to save the Todo Item");
      if (response === true) {
        this.addTodoItem();
      } else {
        alert("Please edit and save the todo Item");
      }
    } 
    const filteredItems = this.state.todoListDetails.filter(
        (item) => item.id !== id
      );
      const selectedItems = this.state.todoListDetails.find(
        (item) => item.id === id
      );
      this.setState({
        todoListDetails: filteredItems,
        todoItemDescription: selectedItems.item,
        editItem: true,
        todoItemId: id,
      });
      this.inputFocusHandler();
  };

  showFullDetailsHandler = (id) => {
    let todoListDetails = this.state.todoListDetails;
    todoListDetails = todoListDetails.map((item) => {
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
      todoListDetails: todoListDetails,
    });
  };

  taskValidator = () => {
    this.setState({
      completedTasks: !this.state.completedTasks,
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
        todoListDetails,
      });
    }
    if (draggedItemIndex > droppedItemIndex) {
      let temp = todoListDetails[draggedItemIndex];
      for (let i = draggedItemIndex; i >= droppedItemIndex; i--) {
        todoListDetails[i] = todoListDetails[i - 1];
      }
      todoListDetails[droppedItemIndex] = temp;
      this.setState({
        todoListDetails,
      });
    }
  };

  render() {
    let finalTodoListDetails;
    if (this.state.completedTasks) {
      finalTodoListDetails = this.state.todoListDetails.filter(
        (item) => item.done === true
      );
    }
    if (!this.state.completedTasks) {
      finalTodoListDetails = this.state.todoListDetails.filter(
        (item) => item.done === false
      );
    }
    //// to display message if no items are present (dynamically)
    let myMessage = this.state.completedTasks
      ? "Tasks which are completed are shown here, please complete a task"
      : "Tasks which are yet to be done are shown here, please add a task";
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
          edited={this.state.editItem}
          taskValidator={this.taskValidator}
          completedTasks={this.state.completedTasks}
          checkBox={
            <CheckBox
              id={"todoSelectDeslectAll"}
              checked={this.state.checked}
              handleCheckBox={this.selectAndDeselectAll}
              label={"Select / Deselect All"}
            />
          }
        ></ActionBar>
        <div className="todoItemWrapper" id="todoItemWrapper" ref={this.myRef}>
          {finalTodoListDetails.length ? (
            finalTodoListDetails.map((item) => (
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
                handleEditIcon={() => this.handleEditIcon(item.id)}
                expand={item.expand}
                dragOnStart={(e) => this.dragOnStart(e, item.id)}
                dragOnOver={(e) => this.dragOnOver(e, item.id)}
                dragOnDrop={(e) => this.dragOnDrop(e, item.id)}
              >
                <CheckBox
                  id={item.id}
                  checked={item.checked}
                  handleCheckBox={this.handleCheckBox}
                />
              </TodoItemContainer>
            ))
          ) : (
            <p className="myMessageDiv">{myMessage}</p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
