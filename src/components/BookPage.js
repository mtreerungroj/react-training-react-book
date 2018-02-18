import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import BookAPI from '../api'
import BookDetail from './BookDetail'

const BookItem = ({ title, primary_isbn13, match }) => (
  <div>
    <Link to={`${match.url}/${primary_isbn13}`}>{title}</Link>
  </div>
)

class BookPage extends Component {
  constructor (props) {
    super(props)
    this.state = { books: [] }
  }

  componentDidMount () {
    // let books = BookAPI.getBooks(this.props.match.params.list_name_encoded)
    // this.setState({ books })

    ;(async () => {
      let books = await BookAPI.getBooks(
        this.props.match.params.list_name_encoded
      )
      this.setState({ books })
    })()
  }

  renderBookDetail = props => {
    return (
      <BookDetail
        {...props}
        list_name_encoded={this.props.match.params.list_name_encoded}
      />
    )
  }

  render () {
    let books = this.state.books

    return !books
      ? <div>Loading...</div>
      : <div>
        <div>Book from {this.props.match.params.list_name_encoded}</div>
        {books.map(b => (
          <BookItem {...b} key={b.primary_isbn13} match={this.props.match} />
          ))}
        <Route
          path={`${this.props.match.url}/:primary_isbn13`}
          render={this.renderBookDetail}
          />
      </div>
  }
}

export default BookPage
