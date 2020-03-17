import React, { Component } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaStrikethrough } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import "./itemContainer.css";

class TodoItemContainer extends Component {
  render() {
    const {
      todoItem,
      deleteTodoItem,
      todoItemStrikeThrough,
      handleInputChange,
      saveTodoOnEnter,
      id,
      toggledClass,
      checked,
      handleCheckBox,
      handleEditIcon
    } = this.props;
    return (
      <div className="todoItemContainer" id="todoItemContainer">
        <input
          type="checkbox"
          className="todoCheckBox"
          id={id}
          checked={checked}
          onChange={handleCheckBox}
        />
        <p
          className={toggledClass ? "strikeThrough" : "saveTaskTextbox"}
          id={id}
          onKeyPress={saveTodoOnEnter}
          onClick={handleInputChange}
        >
          {todoItem}
        </p>
        <FaEdit className="editIcon" onClick={handleEditIcon} />
        <FiTrash2
          className="trashIcon"
          id="trashIcon"
          onClick={deleteTodoItem}
        />
        <FaStrikethrough
          className="strike"
          id={id}
          onClick={todoItemStrikeThrough}
        />
      </div>
    );
  }
}

export default TodoItemContainer;
