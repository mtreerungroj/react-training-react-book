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
    this.state = { names: [], searchText: '' }
  }

  componentDidMount () {
    // let names = BookAPI.getNames()
    // this.setState({ names })

    // BookAPI.getNames().then(names => this.setState({ names }))

    ;(async () => {
      let names = await BookAPI.getNames()
      this.allNames = names
      let params = new URLSearchParams(this.props.history.location.search)
      let searchText = params.get('searchText') || ''
      this.setState({ searchText })
      this.handleSearchTextChange(searchText)
    })()
  }

  componentWillReceiveProps (nextProps) {
    let params = new URLSearchParams(nextProps.history.location.search)
    if (params.get('searchText') !== this.state.searchText) {
      console.log('updating')
      this.handleSearchTextChange(params.get('searchText') || '')
    }
  }

  handleSearchTextChange = searchText => {
    console.log(searchText)
    let names = this.state.name
    names = _.filter(
      this.allNames,
      n => n.list_name.search(new RegExp(searchText, 'i')) >= 0
    )
    this.props.history.replace(
      `${this.props.history.location.pathname}?searchText=${searchText}`
    )
    this.setState({ searchText, names })
  }

  render () {
    return (
      <div>
        <Field>
          <Control>
            <Input
              type='text'
              placeholder='Search'
              value={this.state.searchText}
              onChange={e => this.handleSearchTextChange(e.target.value)}
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
