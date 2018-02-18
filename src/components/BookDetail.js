import React, { Component } from "react"

class HomePage extends Component {
  render() {
    return <div>{this.props.match.params.primary_isbn13}</div>
  }
}

export default HomePage
