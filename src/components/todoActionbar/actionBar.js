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
      edited
    } = this.props;
    return (
      <div>
        <h1 className="mainHeading" id="heading">
          TODO LIST
        </h1>
        <div className="todoActionBar" id="todoActionBar">
          <input
            type="text"
            className="addTaskTextbox"
            id="todoAddTextBox"
            autoFocus
            placeholder="Enter the task to add"
            value={todoItem}
            onChange={handleInputChange}
            onKeyPress={addTodoOnEnter}
          />
          <button
            type="button"
            className="todoButton"
            id="todoAddbutton"
            onClick={addTodoItem}
          >
            {edited ? "Save" : "Add"}
          </button>
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
          <div className="selectDeselectAllContainer todoButton">
            <input
              type="checkbox"
              role="button"
              className="todoSelectDeslectAllCheckBox"
              id="todoSelectDeslectAll"
              checked={checked}
              onChange={selectAndDeselectAll}
            />
            <label className="selectDeselectLabel">
              Select / Deselect All{" "}
            </label>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default ActionBar;
