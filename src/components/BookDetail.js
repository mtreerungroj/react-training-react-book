import React, { Component } from 'react'
import { Modal, ModalBackground, ModalContent, ModalClose } from 'bloomer'
class HomePage extends Component {
  render () {
    return (
      <Modal isActive>
        <ModalBackground />
        <ModalContent>
          {this.props.match.params.primary_isbn13}
        </ModalContent>
        <ModalClose />
      </Modal>
    )
  }
}

export default HomePage
