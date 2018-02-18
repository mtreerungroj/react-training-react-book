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
    ;(async () => {
      let books = await BookAPI.getBooks(this.props.list_name_encoded)
      let primary_isbn13 = this.props.match.params.primary_isbn13
      this.setState({ book: _.find(books, ['primary_isbn13', primary_isbn13]) })
    })()

    // let books = BookAPI.getBooks(this.props.list_name_encoded)
    // let primary_isbn13 = this.props.match.params.primary_isbn13
    // this.setState({ book: _.find(books, ['primary_isbn13', primary_isbn13]) })
  }

  render () {
    let book = this.state.book
    return !book
      ? <div />
      : <Modal isActive>
        <ModalBackground onClick={this.props.onModalClose} />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>{book.title}</ModalCardTitle>
            <Delete onClick={this.props.onModalClose} />
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
            <Button isColor='success' onClick={this.props.onModalClose}>
              {'OK'}
            </Button>
          </ModalCardFooter>
        </ModalCard>
      </Modal>
  }
}

export default HomePage
