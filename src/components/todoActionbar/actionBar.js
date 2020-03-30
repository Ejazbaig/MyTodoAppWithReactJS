import React, { Component } from "react";

class ActionBar extends Component {
  render() {
    const {
      todoItem,
      handleInputChange,
      addTodoItem,
      addTodoOnEnter,
      markSelected,
      deleteSelected,
      selectAndDeselectAll,
      checked,
      edited,
      inputFocus
    } = this.props;

    return (
      <div className="actionBarWrapper">
        <h1 className="mainHeading" id="heading">
          TODO LIST
        </h1>
        <div className="todoInputBar">
          <input
            type="text"
            className="addTaskTextbox"
            id="todoAddTextBox"
            autoFocus
            ref={inputFocus}
            placeholder="Enter the task to add"
            value={todoItem}
            onChange={handleInputChange}
            onKeyPress={addTodoOnEnter}
          />
          <button
            type="button"
            className="todoAddButton"
            id="todoAddbutton"
            onClick={addTodoItem}
          >
            {edited ? "Save" : "Add"}
          </button>
        </div>
        <div className="todoActionBar" id="todoActionBar">
          <div className="checkBoxWrapper">
            <div class="pretty p-icon p-round p-jelly">
              <input
                type="checkbox"
                role="button"
                className="todoSelectDeslectAllCheckBox"
                id="todoSelectDeslectAll"
                checked={checked}
                onChange={selectAndDeselectAll}
              />
              <div class="state p-primary">
                <i class="icon mdi mdi-check"></i>
                <label>Select / Deselect All </label>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="todoButton"
            id="todoDeleteSelectedButton"
            onClick={deleteSelected}
          >
            {" "}
            Delete Selected
          </button>
          <button
            type="button"
            className="todoButton"
            id="todoMarkAllCompletedButton"
            onClick={markSelected}
          >
            {" "}
            Mark/UnMark Selected
          </button>
        </div>
        <hr className="myHrStyle" />
      </div>
    );
  }
}

export default ActionBar;
