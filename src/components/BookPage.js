import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import BookAPI from "../api";

const BookItem = ({ title, primary_isbn13, match }) => (
  <div>
    <Link to={`${match.url}/${primary_isbn13}`}>{title}</Link>
  </div>
);

const BookDetail = ({ match }) => <div>{match.params.primary_isbn13}</div>;

class BookPage extends Component {
  constructor(props) {
    super(props);
    this.state = { books: [] };
  }

  componentDidMount() {
    let books = BookAPI.getBooks(this.props.match.params.list_name_encoded);
    this.setState({ books });
  }

  render() {
    return (
      <div>
        <div>Book from {this.props.match.params.list_name_encoded}</div>
        {this.state.books.map(b => (
          <BookItem {...b} key={b.primary_isbn13} match={this.props.match} />
        ))}
        <Route
          path={`${this.props.match.url}/:primary_isbn13`}
          render={BookDetail}
        />
      </div>
    );
  }
}

export default BookPage;
