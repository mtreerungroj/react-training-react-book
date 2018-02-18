import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Field, Control, Input } from 'bloomer'
import _ from 'lodash'
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
      this.allNames = names
      this.setState({ names })
    })()
  }

  handleSearchTextChange = e => {
    let searchText = e.target.value
    let names = this.state.name
    if (searchText) {
      names = _.filter(
        this.allNames,
        n => n.list_name.search(new RegExp(searchText, 'i')) >= 0
      )
      this.setState({ names })
    } else {
      this.setState({ names: this.allNames })
    }
  }

  render () {
    return (
      <div>
        <Field>
          <Control>
            <Input
              type='text'
              placeholder='Search'
              onChange={this.handleSearchTextChange}
              style={{ width: 400 }}
            />
          </Control>
        </Field>
        {this.state.names.map(n => (
          <NameItem {...n} match={this.props.match} key={n.list_name_encoded} />
        ))}
      </div>
    )
  }
}

export default NamePage
