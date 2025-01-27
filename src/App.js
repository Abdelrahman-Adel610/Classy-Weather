import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state.location = "";
    this.state = { location: "" };
  }

  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <input
          placeholder="Search for Location"
          value={this.state.location}
          onChange={(e) =>
            this.setState({ ...this.state, location: e.target.value })
          }
        />
      </div>
    );
  }
}
export default App;
