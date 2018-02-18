import React, { Component } from 'react'
import { Box, Modal, ModalBackground, ModalContent, ModalClose } from 'bloomer'

class HomePage extends Component {
  handleModalClose = () => {
    this.props.history.goBack()
  }

  render () {
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
