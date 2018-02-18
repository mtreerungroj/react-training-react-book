import React, { Component } from "react";
import { Link, Switch } from "react-router-dom";
import BookAPI from "../api";

const NameItem = ({ list_name, list_name_encoded }) => (
  <div>
    <Link to={`/name/${list_name_encoded}`}>{list_name}</Link>
  </div>
);

class NamePage extends Component {
  constructor(props) {
    super(props);
    this.state = { names: [] };
  }

  componentDidMount() {
    let names = BookAPI.getNames();
    this.setState({ names });
  }

  render() {
    return <div>{this.state.names.map(n => <NameItem {...n} />)}</div>;
  }
}

export default NamePage;
