import React, { PureComponent } from "react";
import Dropdown from "./components/Dropdown";
import ReactDOM from "react-dom";
import { FaAngleDown } from "react-icons/fa";

import "./styles.css";

class Page extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ddOpen: false,
      firstTwoChoices: ["Русский", "Italiano"],
      remainingChoices: ["Geeberish", "French", "Latvian", "Spanish"],
      ddChoice: "More",
      activeSelection: null
    };

    this.selectedDropdownChoice = this.selectedDropdownChoice.bind(this);
    this.changeDropdownState = this.changeDropdownState.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.clickOutsideDropdown = this.clickOutsideDropdown.bind(this);
  }

  changeDropdownState() {
    this.setState({ ddOpen: !this.state.ddOpen });
  }

  selectedDropdownChoice(choice) {
    this.setState({ ddChoice: choice }, () => {
      this.setState({ activeSelection: this.state.ddChoice });
    });
  }

  renderDropdown() {
    return (
      <Dropdown
        choices={this.state.remainingChoices}
        selectedDropdownChoice={this.selectedDropdownChoice}
        changeDropdownState={this.changeDropdownState}
      />
    );
  }

  componentWillMount() {
    document.addEventListener("mousedown", this.clickOutsideDropdown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.clickOutsideDropdown, false);
  }

  clickOutsideDropdown(e) {
    if (this.node.contains(e.target)) return;
    this.setState({ ddOpen: false });
  }

  render() {
    return (
      <div className="card">
        <ul>
          {this.state.firstTwoChoices.map(name => (
            <li>
              <button
                onClick={() => this.setState({ activeSelection: name })}
                className={this.state.activeSelection === name ? "active" : ""}
              >
                {name}
              </button>
            </li>
          ))}
          <li ref={node => (this.node = node)}>
            <button
              onClick={() => this.changeDropdownState()}
              className={
                this.state.activeSelection === this.state.ddChoice
                  ? "active"
                  : ""
              }
            >
              {this.state.ddChoice} <FaAngleDown className="arrow-down" />
            </button>
            {this.state.ddOpen ? this.renderDropdown() : null}
          </li>
        </ul>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Page />, rootElement);
