import React, { Component } from 'react'
import {
  Box,
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardHeader,
  ModalCardTitle,
  ModalCardBody,
  ModalCardFooter,
  Delete,
  Button,
  Image
} from 'bloomer'
import BookAPI from '../api'
import _ from 'lodash'

class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      book: null
    }
  }

  componentDidMount () {
    let books = BookAPI.getBooks(this.props.list_name_encoded)
    let primary_isbn13 = this.props.match.params.primary_isbn13
    this.setState({ book: _.find(books, ['primary_isbn13', primary_isbn13]) })
  }

  handleModalClose = () => this.props.history.goBack()

  render () {
    let book = this.state.book
    console.log(this.state.book)
    return !book
      ? <div>Loading...</div>
      : <Modal isActive>
        <ModalBackground />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>{book.title}</ModalCardTitle>
            <Delete onClick={this.handleModalClose} />
          </ModalCardHeader>
          <ModalCardBody>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Image src={book.book_image} style={{ marginRight: 20 }} />
              <Box>
                {'ISBN: ' + book.primary_isbn13}<br />
                {'Author: ' + book.author}<br />
                {'Publisher: ' + book.publisher}<br /><br />
                {'Description: ' + book.description}<br />
              </Box>
            </div>
          </ModalCardBody>
          <ModalCardFooter>
            <Button isColor='success' onClick={this.handleModalClose}>
              {'OK'}
            </Button>
          </ModalCardFooter>
        </ModalCard>
      </Modal>
  }
}

export default HomePage
