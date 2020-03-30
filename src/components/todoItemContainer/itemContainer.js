import React, { Component } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaStrikethrough } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import "./itemContainer.css";

class TodoItemContainer extends Component {
  render() {
    const {
      todoItem,
      todoItemTitle,
      deleteTodoItem,
      todoItemStrikeThrough,
      showFullDetailsHandler,
      saveTodoOnEnter,
      id,
      toggledClass,
      checked,
      handleCheckBox,
      handleEditIcon,
      expand
    } = this.props;
    return (
      <div className="todoItemContainer" id="todoItemContainer">
        <div class="pretty p-icon p-round p-jelly">
          <input
            type="checkbox"
            className="todoCheckBox"
            id={id}
            checked={checked}
            onChange={handleCheckBox}
          />
          <div class="state p-primary">
            <i class="icon mdi mdi-check"></i>
            <label></label>
          </div>
        </div>
        <p
          className={toggledClass ? "strikeThrough" : "saveTaskTextbox"}
          id={id}
          onKeyPress={saveTodoOnEnter}
          onClick={showFullDetailsHandler}
        >
          {expand === true ? todoItem : todoItemTitle}
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
