import React, { Component } from "react";
import BookAPI from "../api";

const BookItem = ({ title }) => <div>{title}</div>;

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
        {this.state.books.map(b => <BookItem {...b} key={b.primary_isbn13} />)}
      </div>
    );
  }
}

export default BookPage;
