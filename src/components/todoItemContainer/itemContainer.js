import React, { Component } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaStrikethrough } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import "./itemContainer.css";
import CheckBox from "../checkBox/CheckBox";

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
      expand,
      dragOnStart,
      dragOnOver,
      dragOnDrop
    } = this.props;
    return (
      <div
        className="todoItemContainer"
        id="todoItemContainer"
        draggable={true}
        onDragStart={dragOnStart}
        onDragOver={dragOnOver}
        onDrop={dragOnDrop}
      >
        <CheckBox id={id} checked={checked} handleCheckBox={handleCheckBox} />
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
