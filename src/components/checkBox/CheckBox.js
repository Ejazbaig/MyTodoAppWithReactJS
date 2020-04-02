import React, { Component, Fragment } from "react";

class CheckBox extends Component {
  render() {
    const { id, checked, handleCheckBox, label } = this.props;
    return (
      <Fragment>
        <div className="pretty p-icon p-round p-jelly">
          <input
            type="checkbox"
            className="todoCheckBox"
            id={id}
            checked={checked}
            onChange={handleCheckBox}
          />
          <div className="state p-primary">
            <i className="icon mdi mdi-check"></i>
            <label>{label}</label>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CheckBox;
