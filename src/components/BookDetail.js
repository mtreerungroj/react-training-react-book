import React, { Component } from 'react'
import { Box, Modal, ModalBackground, ModalContent, ModalClose } from 'bloomer'
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
    this.setState({ book: _.find(books, ['primary_isbn13'], primary_isbn13) })
  }

  handleModalClose = () => {
    this.props.history.goBack()
  }

  render () {
    console.log(this.state)
    return (
      <Modal isActive>
        <ModalBackground onClick={this.handleModalClose} />
        <ModalContent>
          <Box>
            {this.props.list_name_encoded}
            :
            {this.props.match.params.primary_isbn13}
          </Box>
        </ModalContent>
        <ModalClose onClick={this.handleModalClose} />
      </Modal>
    )
  }
}

export default HomePage
