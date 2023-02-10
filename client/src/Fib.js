import React, { Component } from "react";
import axios from "axios";

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: "",
  };
  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get("/api/values/current");
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const indexes = await axios.get("/api/values/all");
    this.setState({ seenIndexes: indexes.data });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("/api/values", { index: this.state.index });
    this.setState({ index: "" });
  };

  renderIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(", ");
  }
  renderCalculated() {
    const entries = [];
    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For Index {key} i calculated {this.state.values[key]}
        </div>
      );
    }
    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Enter your index</label>{" "}
            <div className="control">
              <input
                className="input"
                type="number"
                value={this.state.index}
                onChange={(e) => {
                  this.setState({ index: e.target.value });
                }}
              />
              <button className="button">Submit</button>
            </div>
          </div>
        </form>
        <h3 className="title is-2">Indexes I have Seen:</h3>
        {this.renderIndexes()}
        <h3 className="title is-2">Calculated Values:</h3>
        {this.renderCalculated()}
      </div>
    );
  }
}

export default Fib;
