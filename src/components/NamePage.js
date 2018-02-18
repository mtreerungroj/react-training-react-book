import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookAPI from '../api'

const NameItem = ({ list_name, list_name_encoded, match }) => (
  <div>
    <Link to={`${match.url}/${list_name_encoded}`}>{list_name}</Link>
  </div>
)

class NamePage extends Component {
  constructor (props) {
    super(props)
    this.state = { names: [] }
  }

  componentDidMount () {
    // let names = BookAPI.getNames()
    // this.setState({ names })

    // BookAPI.getNames().then(names => this.setState({ names }))

    ;(async () => {
      let names = await BookAPI.getNames()
      this.setState({ names })
    })()
  }

  render () {
    return (
      <div>
        {this.state.names.map(n => (
          <NameItem {...n} match={this.props.match} key={n.list_name_encoded} />
        ))}
      </div>
    )
  }
}

export default NamePage
