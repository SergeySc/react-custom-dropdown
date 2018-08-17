import React, { PureComponent } from "react";

import "./styles.css";

class Dropdown extends PureComponent {
  render() {
    return (
      <div className="dropdown">
        <div className="dropdown-container">
          <ul>
            {this.props.choices.map(choice => (
              <li
                onClick={() => {
                  this.props.selectedDropdownChoice(choice);
                  this.props.changeDropdownState();
                }}
              >
                {choice}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Dropdown;
